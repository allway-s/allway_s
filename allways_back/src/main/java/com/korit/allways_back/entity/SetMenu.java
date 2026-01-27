package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetMenu {

    private Integer setId;
    private String setCode; 
    private String setName;
    private String description;
    private Integer additionalPrice;
    private Boolean isActive;
    private Integer displayOrder;
    private LocalDateTime createdAt;

    // 조인용
    private List<SetComponent> components;
}