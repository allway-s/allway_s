package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    private Integer productId;
    private Boolean isSystem;
    private LocalDateTime createdAt;

    // 조인용 필드
    private Integer itemId;
    private String itemName;
    private Integer itemSize;
    private String itemImageUrl;
    private List<Integer> ingredientIds;
    private List<Ingredient> ingredients;
}