package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    /**
     * 카테고리별 재료 조회
     * GET /api/ingredients?category=토핑
     */
    @GetMapping("/api/ingredients")
    public ResponseEntity<List<Ingredient>> getIngredientsByCategory(@RequestParam("categoryName") String category) {
        List<Ingredient> ingredients = ingredientService.getIngredientsByCategory(category);
        return ResponseEntity.ok(ingredients);
    }
}