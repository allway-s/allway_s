package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    private int productId;
    private int isSys;
    private int itemId;
    private List<Integer> ingredientIds;
    private List<Ingredient> ingredients;


}
