package com.korit.allways_back.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class SetMenuRespDto {
    private Integer setId;
    private String setName;
    private Integer additionalPrice;
    private List<SetComponentRespDto> components;
}
