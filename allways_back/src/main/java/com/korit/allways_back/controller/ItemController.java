package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Item;
import com.korit.allways_back.service.ItemService;
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
public class ItemController {

    private final ItemService itemService;

    /**
     * 카테고리별 아이템 조회
     * GET /api/items?category=피자
     */
    @GetMapping("/api/items")
    public ResponseEntity<List<Item>> getItemsByCategory(@RequestParam("categoryName") String category) {
        List<Item> items = itemService.getItemByCategory(category);
        return ResponseEntity.ok(items);
    }
}