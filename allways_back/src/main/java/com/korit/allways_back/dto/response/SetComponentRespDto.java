package com.korit.allways_back.dto.response;

import lombok.Data;

@Data
public class SetComponentRespDto {
    private String componentType;    // 구성 종류 (SIDE, DRINK 등)
    private String categoryName;     // 연결된 카테고리명 (야채, 소스 등과 매칭용)
}