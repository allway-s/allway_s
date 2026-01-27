package com.korit.allways_back.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductIngredient {

    private Integer productIngredientId;
    private Integer productId;
    private Integer ingredientId;

    // 조인용 필드 (필요시)
    private Product product;
    private Ingredient ingredient;
}
