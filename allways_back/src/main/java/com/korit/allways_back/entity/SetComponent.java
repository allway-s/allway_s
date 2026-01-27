package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetComponent {

    private Integer componentId;
    private Integer setId;
    private ComponentType componentType;
    private Integer categoryId; // 선택 가능한 재료 카테고리

    // 조인용 필드 (필요시)
    private SetMenu setMenu;
    private Category category;

    public enum ComponentType {
        drink, side
    }
}