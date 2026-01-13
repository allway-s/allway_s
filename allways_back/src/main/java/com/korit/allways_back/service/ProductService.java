package com.korit.allways_back.service;

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

    @Transactional
    public Integer findExistingProductId(int itemId, List<Integer> ingredientIds) {

        int count = ingredientIds.size();

        Integer productId = productMapper.findExistingProductId(itemId, ingredientIds, count);

        if (productId != null) {
            return productId;
        }

        Product newProduct = createNewProduct(itemId, ingredientIds);

        return newProduct.getProductId();
    }

    public Product createNewProduct(int itemId, List<Integer> ingredientIds) {
        Product product = Product.builder()
                .isSys(0)
                .build();

        productMapper.insertProduct(product);

        productMapper.insertProductDetails(product.getProductId(), itemId, ingredientIds);

        return product;
    }
}
