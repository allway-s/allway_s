package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.ProductReqDto;
import com.korit.allways_back.entity.Product;
import com.korit.allways_back.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;

    @Transactional
    public int getOrCreateProduct(ProductReqDto productReqDto) {
        // 1. 기존에 동일한 구성(아이템 + 식재료들)의 Product가 있는지 조회
        Integer existingProductId = productMapper.findExistingProduct(
                productReqDto.getItemId(),
                productReqDto.getIngredientIds(),
                productReqDto.getIngredientCount()
        );

        // 2. 이미 존재한다면 해당 ID 반환
        if (existingProductId != null) {
            return existingProductId;
        }

        // 3. 없다면 새로운 Product 생성
        Product newProduct = Product.builder()
                .isSystem(false) // 사용자가 만든 커스텀 상품
                .build();

        // insertProduct 호출 시 useGeneratedKeys에 의해 productId가 채워짐
        productMapper.insertProduct(newProduct);
        int productId = newProduct.getProductId();

        // 4. Product와 Item 관계 매핑
        productMapper.insertProductItem(productId, productReqDto.getItemId());

        // 5. Product와 Ingredients 관계 매핑 (재료가 있을 경우)
        if (productReqDto.getIngredientIds() != null && !productReqDto.getIngredientIds().isEmpty()) {
            productMapper.insertProductIngredients(productId, productReqDto.getIngredientIds());
        }

        return productId;
    }
}