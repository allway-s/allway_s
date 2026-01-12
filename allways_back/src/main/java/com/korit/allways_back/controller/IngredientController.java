package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class IngredientController {

    private final IngredientService ingredientService;

    public ResponseEntity<List<Ingredient>> getItems(String categoryName) {
        return ResponseEntity.ok(ingredientService.getIngredientsByCategory(categoryName));
    }

}
