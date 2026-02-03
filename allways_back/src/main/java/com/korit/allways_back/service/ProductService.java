package com.korit.allways_back.service;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.Product;
import com.korit.allways_back.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * ProductService - 상품 관련 비즈니스 로직
 *
 * 주요 기능:
 * 1. 상품 생성 또는 기존 상품 찾기 (중복 방지)
 * 2. 상품 정보 조회
 * 3. 상품 가격 계산
 * 4. 썹픽(시스템 레시피) 조회
 *
 * 트랜잭션:
 * - 상품 생성은 @Transactional로 원자성 보장
 * - 생성 실패 시 모든 작업 롤백
 */
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;

    /**
     * 상품 생성 또는 기존 상품 찾기
     *
     * @param itemId 아이템 ID (예: 5 = 이탈리안 비엠티)
     * @param ingredientIds 선택한 재료 ID 리스트
     * @return 상품 ID (기존 또는 새로 생성)
     *
     * 처리 흐름:
     * 1. 동일한 조합(아이템 + 재료)이 이미 존재하는지 확인
     * 2. 존재하면 → 기존 product_id 반환
     * 3. 존재하지 않으면 → 새 상품 생성
     *    - product_tb에 새 레코드 추가
     *    - product_item_tb에 아이템 연결
     *    - product_ingredient_tb에 재료들 연결
     *
     * 왜 중복 체크를 하는가?
     * - 똑같은 조합의 상품을 여러 번 만들지 않음
     * - DB 공간 절약
     * - 주문 내역 조회 시 같은 상품끼리 묶을 수 있음
     *
     * 예시 1 (기존 상품 재사용):
     * - 사용자 A: 이탈리안 비엠티 + [화이트, 아메리칸 치즈, 양상추]
     *   → product_id = 100 생성
     * - 사용자 B: 이탈리안 비엠티 + [화이트, 아메리칸 치즈, 양상추] (똑같음)
     *   → product_id = 100 재사용 (새로 만들지 않음)
     *
     * 예시 2 (새 상품 생성):
     * - 사용자 C: 이탈리안 비엠티 + [허니오트, 슈레드 치즈, 양상추] (다름)
     *   → product_id = 101 생성
     *
     * @Transactional
     * - 상품 생성은 3단계 작업 (product, product_item, product_ingredient)
     * - 중간에 실패하면 모두 롤백되어야 함
     */
    @Transactional
    public Integer createOrFindProduct(Integer itemId, List<Integer> ingredientIds, Boolean isSystem) {

        // 1. 기존 상품 찾기 (동일한 조합이 있는지 확인)
        if (ingredientIds != null && !ingredientIds.isEmpty()) {
            Integer existingProductId = productMapper.findExistingProduct(
                    itemId,
                    ingredientIds,
                    ingredientIds.size()
            );

            // 이미 존재하면 기존 product_id 반환
            if (existingProductId != null) {
                return existingProductId;
            }
        }

        // 2. 새 상품 생성
        Product product = Product.builder()
                .isSystem(false)  // 사용자 커스텀 (시스템 레시피가 아님)
                .build();
        productMapper.insertProduct(product);
        // → product.getProductId()에 자동 생성된 ID가 들어감 (예: 69)

        // 3. 상품-아이템 연결
        productMapper.insertProductItem(product.getProductId(), itemId);
        // → product_item_tb: (69, 5) 추가

        // 4. 상품-재료 연결
        if (ingredientIds != null && !ingredientIds.isEmpty()) {
            productMapper.insertProductIngredients(product.getProductId(), ingredientIds);
            // → product_ingredient_tb: (69, 103), (69, 203), ... 추가
        }

        // 5. 생성된 상품 ID 반환
        return product.getProductId();
    }

    /**
     * 상품 ID로 상품 정보 조회
     *
     * @param productId 상품 ID
     * @return Product 객체 (재료 목록 포함)
     * @throws IllegalArgumentException 상품이 존재하지 않을 때
     *
     * 처리 흐름:
     * 1. product_tb에서 기본 정보 조회
     * 2. product_ingredient_tb에서 재료 목록 조회
     * 3. Product 객체에 재료 목록 설정
     *
     * 예시:
     * Product product = productService.getProductById(69);
     * // product.getProductId() == 69
     * // product.isSystem() == false
     * // product.getIngredients() == [Ingredient(103), Ingredient(203), ...]
     */
    public Product getProductById(Integer productId) {
        // 1. 기본 정보 조회
        Product product = productMapper.findById(productId);
        if (product == null) {
            throw new IllegalArgumentException("존재하지 않는 상품입니다.");
        }

        // 2. 재료 목록 조회
        List<Ingredient> ingredients = productMapper.findIngredientsByProductId(productId);
        product.setIngredients(ingredients);

        return product;
    }

    /**
     * 상품 가격 계산
     *
     * @param productId 상품 ID
     * @return 총 가격 (아이템 기본 가격 + 재료 추가 가격)
     *
     * 계산 방식:
     * - 아이템 기본 가격 (item_tb.price)
     * - 모든 재료의 추가 가격 합산 (ingredient_tb.price의 SUM)
     * - 총 가격 = 기본 가격 + 재료 추가 가격
     *
     * 예시:
     * - 이탈리안 비엠티 기본: 4,500원
     * - 추가 치즈: +300원
     * - 베이컨 추가: +300원
     * - 총 가격: 5,100원
     *
     * Integer price = productService.calculateProductPrice(69);
     * // price == 5100
     */
    public Integer calculateProductPrice(Integer productId) {
        return productMapper.calculatePrice(productId);
    }

    /**
     * 썹픽(Subway Pick) 조회 - 시스템 추천 레시피
     *
     * @param itemId 아이템 ID
     * @return Map 형태의 썹픽 정보 (상품 정보 + 재료 목록)
     *
     * 처리 흐름:
     * 1. is_system=1인 상품 조회 (DB에 미리 등록된 추천 레시피)
     * 2. 재료 목록 추가 조회
     * 3. Map에 재료 정보 추가
     *
     * 반환 데이터:
     * {
     *   "productId": 1,
     *   "itemId": 5,
     *   "itemName": "이탈리안 비엠티",
     *   "imageUrl": "http://...",
     *   "size": 15,
     *   "totalPrice": 5100,
     *   "ingredients": [
     *     { "ingredientId": 103, "ingredientName": "화이트", ... },
     *     { "ingredientId": 203, "ingredientName": "아메리칸 치즈", ... },
     *     ...
     *   ]
     * }
     *
     * 사용 케이스:
     * - MenuPage에서 "썹픽" 버튼 클릭
     * - 커스터마이징 없이 바로 장바구니에 담을 수 있음
     *
     * 예시:
     * Map<String, Object> subwayPick = productService.getSubwayPickByItemId(5);
     * // 이탈리안 비엠티의 썹픽 정보 반환
     * // 사용자는 이 정보로 바로 장바구니에 추가 가능
     */
    public Map<String, Object> getSubwayPickByItemId(Integer itemId) {
        // 1. 썹픽 기본 정보 조회 (is_system=1인 상품)
        Map<String, Object> subwayPick = productMapper.findSubwayPickByItemId(itemId);

        // 2. productId 추출
        Integer productId = (Integer) subwayPick.get("productId");

        // 3. 재료 목록 조회 및 추가
        List<Ingredient> ingredients = productMapper.findIngredientsByProductId(productId);
        subwayPick.put("ingredients", ingredients);

        // 4. 완성된 썹픽 정보 반환
        return subwayPick;
    }
}