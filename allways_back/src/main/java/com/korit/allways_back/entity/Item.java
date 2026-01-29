package com.korit.allways_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    private Integer itemId;
    private Integer categoryId;
    private String itemName;
    private String description;
    private Integer basePrice;
    private Integer size; // 15 or 30 (cm)
    private Integer imageId;
    private String imageUrl;

    // 조인용 필드 (필요시)
    @JsonIgnore
    private Category category;
    @JsonIgnore
    private Image image;
}