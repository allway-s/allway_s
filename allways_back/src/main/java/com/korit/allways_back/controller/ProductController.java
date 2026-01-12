package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.CartItemDto;
import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController("/api/order")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping("")
    public ResponseEntity<List<Integer>> createProducts(@RequestBody OrderReqDto dto) {
        List<Integer> productIds = new ArrayList<>();

        for (CartItemDto cartItem : dto.getCartItems()) {

            Integer productId = productService.findExistingProductId(
                    cartItem.getItemId(),
                    cartItem.getIngredientIds()
            );

            productIds.add(productId);
        }

        return ResponseEntity.ok(productIds);
    }

}
