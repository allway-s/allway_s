package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.ProductReqDto;
import com.korit.allways_back.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Integer> findOrCreateProduct(
            @RequestBody ProductReqDto dto
    ) {
        Integer productId = productService.findOrCreateProduct(
                dto.getItemId(),
                dto.getIngredientIds()
        );

        return ResponseEntity.ok(productId);
    }
}