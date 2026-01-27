package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.SetComponent;
import com.korit.allways_back.entity.SetMenu;
import com.korit.allways_back.service.SetMenuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sets")
@RequiredArgsConstructor
public class SetMenuController {

    private final SetMenuService setMenuService;

    /**
     * 모든 세트 메뉴 조회
     * GET /api/sets
     */
    @GetMapping
    public ResponseEntity<List<SetMenu>> getAllSets() {
        List<SetMenu> sets = setMenuService.getAllSets();
        return ResponseEntity.ok(sets);
    }

    /**
     * 세트 메뉴 조회 (by ID)
     * GET /api/sets/1
     */
    @GetMapping("/{setId}")
    public ResponseEntity<SetMenu> getSetById(@PathVariable Integer setId) {
        SetMenu setMenu = setMenuService.getSetById(setId);
        return ResponseEntity.ok(setMenu);
    }

    /**
     * 세트 구성요소 조회
     * GET /api/sets/1/components
     *
     * Response:
     * [
     *   { "componentType": "drink", "categoryId": 5 },
     *   { "componentType": "side", "categoryId": 8 }
     * ]
     */
    @GetMapping("/{setId}/components")
    public ResponseEntity<List<SetComponent>> getSetComponents(@PathVariable Integer setId) {
        List<SetComponent> components = setMenuService.getSetComponents(setId);
        return ResponseEntity.ok(components);
    }

    /**
     * 세트 메뉴 상세 정보 (세트 + 구성요소 + 선택 가능한 재료)
     * GET /api/sets/1/detail
     *
     * Response:
     * {
     *   "setMenu": { "setId": 1, "setName": "세트A" },
     *   "components": [...],
     *   "selectableOptions": {
     *     "drink": [{ "ingredientId": 10, "ingredientName": "콜라" }, ...],
     *     "side": [{ "ingredientId": 20, "ingredientName": "감자튀김" }, ...]
     *   }
     * }
     */
    @GetMapping("/{setId}/detail")
    public ResponseEntity<Map<String, Object>> getSetMenuDetail(@PathVariable Integer setId) {
        Map<String, Object> detail = setMenuService.getSetMenuDetail(setId);
        return ResponseEntity.ok(detail);
    }

    /**
     * 카테고리별 선택 가능한 재료 조회
     * GET /api/sets/categories/5/ingredients
     */
    @GetMapping("/categories/{categoryId}/ingredients")
    public ResponseEntity<List<Ingredient>> getSelectableIngredients(@PathVariable Integer categoryId) {
        List<Ingredient> ingredients = setMenuService.getSelectableIngredients(categoryId);
        return ResponseEntity.ok(ingredients);
    }
}
