package com.korit.allways_back.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class CartItemDto {
    private int itemId;
    private List<Integer> ingredientIds;
    private int count;
    private int unitPrice;
}