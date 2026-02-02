package com.korit.allways_back.entity;

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
    private Integer price;
    private Integer size; // 15 or 30 (cm)
    private String imageUrl;

}