package com.korit.allways_back.service;

import com.korit.allways_back.entity.Product;
import com.korit.allways_back.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;


    @Transactional
    public Integer findOrCreateProduct(int itemId, List<Integer> ingredientIds) {

        Integer existingProductId = productMapper.findExistingProductId(
                itemId,
                ingredientIds,
                ingredientIds.size()
        );

        if (existingProductId != null) {
            return existingProductId;
        }

        Product newProduct = createNewProduct(itemId, ingredientIds);

        return newProduct.getProductId();
    }


    private Product createNewProduct(int itemId, List<Integer> ingredientIds) {

        Product product = Product.builder()
                .isSys(0)
                .build();

        productMapper.insertProduct(product);

        productMapper.insertProductDetails(
                product.getProductId(),
                itemId,
                ingredientIds
        );

        return product;
    }
}