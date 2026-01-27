package com.korit.allways_back.dto.request;

import lombok.Data;

@Data
public class SetComponentRespDto {
    private String componentType;
    private Integer categoryId;
    private String categoryName;
}
