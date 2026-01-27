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
    private String componentType;
    private Integer categoryId;
    private String categoryName;
}