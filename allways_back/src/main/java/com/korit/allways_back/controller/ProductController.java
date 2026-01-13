package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.ProductReqDto;
import com.korit.allways_back.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("/api/product")
    public ResponseEntity<Integer> createProducts(@RequestBody ProductReqDto dto) {

        Integer productId = productService.findExistingProductId(
                dto.getItemId(),
                dto.getIngredientIds()
        );

        return ResponseEntity.ok(productId);
    }

}
