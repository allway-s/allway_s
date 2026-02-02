    package com.korit.allways_back.service;

    import com.korit.allways_back.entity.Ingredient;
    import com.korit.allways_back.entity.Product;
    import com.korit.allways_back.mapper.ProductMapper;
    import lombok.RequiredArgsConstructor;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;

    import java.util.List;

    @Service
    @RequiredArgsConstructor
    public class ProductService {

        private final ProductMapper productMapper;

        /**
         * 상품 생성 또는 기존 상품 찾기
         * 동일한 조합(아이템 + 재료)이 있으면 기존 상품 ID 반환
         * 없으면 새로 생성
         */
        @Transactional
        public Integer createOrFindProduct(Integer itemId, List<Integer> ingredientIds, Boolean isSystem) {

            if (ingredientIds != null && !ingredientIds.isEmpty()) {
                Integer existingProductId = productMapper.findExistingProduct(
                        itemId,
                        ingredientIds,
                        ingredientIds.size()
                );

                if (existingProductId != null) {
                    return existingProductId;
                }
            }
            
            // 새 상품 생성
            Product product = Product.builder()
                    .isSystem(false)
                    .build();
            productMapper.insertProduct(product);

            // 상품-아이템 연결
            productMapper.insertProductItem(product.getProductId(), itemId);

            // 상품-재료 연결
            if (ingredientIds != null && !ingredientIds.isEmpty()) {
                productMapper.insertProductIngredients(product.getProductId(), ingredientIds);
            }

            return product.getProductId();
        }

        /**
         * 상품 ID로 상품 정보 조회
         */
        public Product getProductById(Integer productId) {
            Product product = productMapper.findById(productId);
            if (product == null) {
                throw new IllegalArgumentException("존재하지 않는 상품입니다.");
            }

            // 재료 목록 조회
            List<Ingredient> ingredients = productMapper.findIngredientsByProductId(productId);
            product.setIngredients(ingredients);

            return product;
        }

        /**
         * 상품 가격 계산
         */
        public Integer calculateProductPrice(Integer productId) {
            return productMapper.calculatePrice(productId);
        }
    }