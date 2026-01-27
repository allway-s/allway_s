package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    private Integer categoryId;
    private String categoryType;
    private String categoryName;
    private Integer displayOrder;
    private Boolean isActive;
    private LocalDateTime createdAt;
}