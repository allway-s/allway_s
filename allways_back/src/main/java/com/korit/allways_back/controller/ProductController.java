package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.ProductCreateRequestDto;
import com.korit.allways_back.entity.Product;
import com.korit.allways_back.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    /**
     * 상품 생성 또는 기존 상품 찾기
     * POST /api/products
     *
     * Request Body:
     * {
     *   "itemId": 1,
     *   "ingredientIds": [1, 2, 3],
     *   "isSystem": false
     * }
     */
    @PostMapping
    public ResponseEntity<Map<String, Integer>> createOrFindProduct(@RequestBody ProductCreateRequestDto dto) {

        Integer productId = productService.createOrFindProduct(
                dto.getItemId(),
                dto.getIngredientIds(),
                dto.getIsSystem()
        );

        Map<String, Integer> response = new HashMap<>();
        response.put("productId", productId);
        return ResponseEntity.ok(response);
    }

    /**
     * 상품 조회 (by ID)
     */
    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer productId) {
        Product product = productService.getProductById(productId);
        return ResponseEntity.ok(product);
    }

    /**
     * 상품 가격 계산
     */
    @GetMapping("/{productId}/price")
    public ResponseEntity<Map<String, Integer>> calculatePrice(@PathVariable Integer productId) {
        int price = productService.calculateProductPrice(productId);
        Map<String, Integer> response = new HashMap<>();
        response.put("price", price);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/subway-pick/{itemId}")
    public ResponseEntity<Map<String, Object>> getSubwayPick(@PathVariable Integer itemId) {
        Map<String, Object> subwayPick = productService.getSubwayPickByItemId(itemId);
        return ResponseEntity.ok(subwayPick);
    }
}