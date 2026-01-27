package com.korit.allways_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Integer productId;
    private Boolean isSystem;

    // Swagger/JSON 응답에서 숨기고 싶은 필드에 추가
    private Integer itemId;
    private List<Ingredient> ingredients;
}