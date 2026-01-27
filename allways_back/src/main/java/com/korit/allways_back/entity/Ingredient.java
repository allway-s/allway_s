package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Ingredient {

    private Integer ingredientId;
    private Integer categoryId;
    private String ingredientName;
    private Integer price;
    private Integer imageId;
    private Integer displayOrder;

    // 조인용 필드
    private String categoryName;
}