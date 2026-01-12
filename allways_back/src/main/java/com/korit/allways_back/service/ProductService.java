package com.korit.allways_back.service;

import com.korit.allways_back.entity.Product;
import com.korit.allways_back.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper productMapper;

    @PostMapping
    public List<Product> createProduct() {
        productMapper.insertProduct(Product.builder()

                .build())
    }


}
