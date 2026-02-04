package com.korit.allways_back.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class ProductCreateRequestDto {

    private Integer itemId;
    private List<Integer> ingredientIds;
    private Boolean isSystem = false;

}