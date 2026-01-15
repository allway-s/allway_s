package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    @GetMapping("/api/ingredients")
    public ResponseEntity<List<Ingredient>> getIngredient(@RequestParam("categoryName") String categoryName) {
        return ResponseEntity.ok(ingredientService.getIngredientsByCategory(categoryName));
    }

}
