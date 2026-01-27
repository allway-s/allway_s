package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.ProductReqDto;
import com.korit.allways_back.service.IngredientService;
import com.korit.allways_back.service.ItemService;
import com.korit.allways_back.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // REST API를 위한 컨트롤러임을 선언
@RequestMapping("/api/menu") // 공통 경로 설정
@RequiredArgsConstructor // 생성자 주입을 위한 어노테이션
public class MenuController {

    private final ItemService itemService; // 아이템(베이스) 서비스
    private final IngredientService ingredientService; // 식재료 서비스
    private final ProductService productService; // 커스텀 조합 서비스

    @GetMapping("/items/{categoryName}") // 특정 카테고리의 베이스 아이템 조회
    public ResponseEntity<?> getItems(@PathVariable String categoryName) {
        // 경로 변수로 들어온 카테고리 명에 해당하는 아이템 리스트를 반환함
        return ResponseEntity.ok(itemService.getItemByCategory(categoryName));
    }

    @GetMapping("/ingredients/{categoryName}") // 특정 카테고리의 식재료 조회
    public ResponseEntity<?> getIngredients(@PathVariable String categoryName) {
        // 토핑, 소스 등 카테고리별 재료 리스트를 조회함
        return ResponseEntity.ok(ingredientService.getIngredientsByCategory(categoryName));
    }

    @PostMapping("/product") // 새로운 커스텀 조합 생성 또는 조회
    public ResponseEntity<?> getOrCreateProduct(@RequestBody ProductReqDto productReqDto) {
        // 사용자가 선택한 재료 조합이 있으면 ID를 가져오고, 없으면 새로 생성하여 ID 반환
        int productId = productService.getOrCreateProduct(productReqDto);
        return ResponseEntity.ok(productId);
    }
}
