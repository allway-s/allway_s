package com.korit.allways_back.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductReqDto {
    private int itemId;
    private List<Integer> ingredientIds;
}
