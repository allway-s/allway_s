package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Item;
import com.korit.allways_back.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/api/items")
    public ResponseEntity<List<Item>> getItems(@RequestParam("categoryName") String categoryName) {
        return ResponseEntity.ok(itemService.getItemByCategory(categoryName));
    }

}
