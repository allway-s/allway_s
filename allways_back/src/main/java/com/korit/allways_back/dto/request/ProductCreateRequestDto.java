package com.korit.allways_back.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductCreateRequestDto {

    private Integer itemId;
    private List<Integer> ingredientIds;
    private Boolean isSystem = false;

}