package com.korit.allways_back.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class SetMenuRespDto {
    private Integer setId;           // 세트 고유 ID
    private String setName;          // 세트 이름 (예: 쿠키 세트)
    private Integer additionalPrice; // 세트 추가 금액
    private List<SetComponentRespDto> components; // 세트에 포함된 구성 요소 (사이드, 음료 등)
}
