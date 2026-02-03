package com.korit.allways_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private String imageUrl;

}