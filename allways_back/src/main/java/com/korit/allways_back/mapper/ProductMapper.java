package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.Product;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

/**
 * ProductMapper - 상품(Product) 관련 데이터베이스 작업
 *
 * 주요 역할:
 * - 상품 생성 및 조회
 * - 상품-아이템-재료 연결 관계 관리
 * - 중복 상품 체크 (동일한 조합이 이미 존재하는지 확인)
 * - 상품 가격 계산
 * - 썹픽(시스템 레시피) 조회
 *
 * DB 구조:
 * - product_tb: 상품 기본 정보 (productId, isSystem, createdAt)
 * - product_item_tb: 상품-아이템 연결 (N:1)
 * - product_ingredient_tb: 상품-재료 연결 (N:M)
 */
@Mapper
public interface ProductMapper {

    /**
     * 상품 생성
     *
     * @param product Product 객체 (isSystem 포함)
     *
     * 동작:
     * - product_tb에 새 레코드 추가
     * - 자동 생성된 product_id를 Product 객체에 자동 매핑 (useGeneratedKeys)
     *
     * 예시:
     * Product product = Product.builder().isSystem(false).build();
     * productMapper.insertProduct(product);
     * // product.getProductId() == 69 (자동 생성됨)
     */
    void insertProduct(Product product);

    /**
     * 상품-아이템 연결
     *
     * @param productId 상품 ID
     * @param itemId 아이템 ID (예: 5 = 이탈리안 비엠티)
     * @return 영향받은 행 수 (보통 1)
     *
     * 동작:
     * - product_item_tb에 연결 정보 저장
     * - 하나의 상품은 하나의 아이템을 기반으로 함
     *
     * 예시:
     * productMapper.insertProductItem(69, 5);
     * // 상품 69번 = 이탈리안 비엠티 베이스
     */
    int insertProductItem(@Param("productId") Integer productId, @Param("itemId") Integer itemId);

    /**
     * 상품-재료 연결 (일괄 삽입)
     *
     * @param productId 상품 ID
     * @param ingredientIds 재료 ID 리스트
     * @return 영향받은 행 수
     *
     * 동작:
     * - product_ingredient_tb에 여러 재료를 한 번에 연결
     * - foreach 구문으로 일괄 INSERT
     *
     * 예시:
     * List<Integer> ingredientIds = Arrays.asList(103, 203, 301, 302);
     * productMapper.insertProductIngredients(69, ingredientIds);
     * // 상품 69번에 빵(103), 치즈(203), 야채(301, 302) 연결
     */
    int insertProductIngredients(@Param("productId") Integer productId, @Param("ingredientIds") List<Integer> ingredientIds);

    /**
     * 기존 상품 찾기 (중복 체크)
     *
     * @param itemId 아이템 ID
     * @param ingredientIds 재료 ID 리스트
     * @param ingredientCount 재료 개수 (ingredientIds.size())
     * @return 기존 상품 ID (없으면 null)
     *
     * 동작:
     * - 동일한 아이템 + 동일한 재료 조합을 가진 상품이 이미 있는지 확인
     * - 있으면 해당 product_id 반환
     * - 없으면 null 반환 → 새로 생성해야 함
     *
     * 왜 필요한가?
     * - 똑같은 조합의 상품을 중복 생성하지 않음
     * - DB 공간 절약 및 쿼리 성능 향상
     *
     * 예시:
     * Integer existingId = productMapper.findExistingProduct(5, [103, 203, 301], 3);
     * if (existingId != null) {
     *     return existingId;  // 이미 존재하는 상품 재사용
     * } else {
     *     // 새 상품 생성
     * }
     */
    Integer findExistingProduct(
            @Param("itemId") Integer itemId,
            @Param("ingredientIds") List<Integer> ingredientIds,
            @Param("ingredientCount") Integer ingredientCount
    );

    /**
     * 상품 ID로 조회
     *
     * @param productId 상품 ID
     * @return Product 객체 (없으면 null)
     *
     * 동작:
     * - product_tb에서 기본 정보만 조회 (재료 목록은 포함 안 됨)
     * - 재료 정보는 findIngredientsByProductId()로 별도 조회
     *
     * 예시:
     * Product product = productMapper.findById(69);
     * // product.getProductId() == 69
     * // product.isSystem() == false
     */
    Product findById(@Param("productId") Integer productId);

    /**
     * 상품의 재료 목록 조회
     *
     * @param productId 상품 ID
     * @return 재료 리스트 (Ingredient 객체들)
     *
     * 동작:
     * - product_ingredient_tb를 JOIN하여 해당 상품의 모든 재료 조회
     * - 재료 상세 정보 포함 (이름, 가격, 카테고리, 이미지 등)
     *
     * 예시:
     * List<Ingredient> ingredients = productMapper.findIngredientsByProductId(69);
     * // [
     * //   Ingredient(ingredientId=103, ingredientName="화이트", price=0),
     * //   Ingredient(ingredientId=203, ingredientName="아메리칸 치즈", price=0),
     * //   ...
     * // ]
     */
    List<Ingredient> findIngredientsByProductId(@Param("productId") Integer productId);

    /**
     * 상품 가격 계산
     *
     * @param productId 상품 ID
     * @return 총 가격 (아이템 기본 가격 + 재료 추가 가격)
     *
     * 동작:
     * - item_tb에서 기본 아이템 가격 조회
     * - ingredient_tb에서 모든 재료 가격 합산
     * - 총 가격 반환
     *
     * 예시:
     * Integer price = productMapper.calculatePrice(69);
     * // 4,500원 (아이템) + 600원 (재료) = 5,100원
     */
    Integer calculatePrice(@Param("productId") Integer productId);

    /**
     * 썹픽(Subway Pick) 조회 - 시스템 레시피
     *
     * @param itemId 아이템 ID
     * @return Map 형태의 썹픽 정보
     *
     * 반환 데이터:
     * - productId: 상품 ID
     * - itemId: 아이템 ID
     * - itemName: 아이템 이름
     * - imageUrl: 이미지 URL
     * - size: 사이즈 (15cm or 30cm)
     * - totalPrice: 총 가격
     *
     * 동작:
     * - is_system = 1인 상품만 조회 (DB에 미리 등록된 추천 레시피)
     * - 해당 아이템의 썹픽 정보 반환
     *
     * 사용 케이스:
     * - "썹픽" 버튼 클릭 시 사용
     * - 커스터마이징 없이 바로 장바구니에 담을 수 있음
     *
     * 예시:
     * Map<String, Object> subwayPick = productMapper.findSubwayPickByItemId(5);
     * // {
     * //   "productId": 1,
     * //   "itemId": 5,
     * //   "itemName": "이탈리안 비엠티",
     * //   "totalPrice": 5100,
     * //   ...
     * // }
     */
    Map<String, Object> findSubwayPickByItemId(@Param("itemId") Integer itemId);
}