package com.korit.allways_back.entity;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    private Integer categoryId;
    private CategoryType categoryType;
    private String categoryName;
    private Integer displayOrder;
    private Boolean isActive;
    private LocalDateTime createdAt;

    public enum CategoryType {
        item, ingredient
    }
}