package com.korit.allways_back.dto.request;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProductReqDto {
    private Integer itemId;
    private List<Integer> ingredientIds;

    public int getIngredientCount() {
        return ingredientIds == null ? 0 : ingredientIds.size();
    }
}