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

    private int itemId;
    private int itemCategoryId;
    private String itemName;
    private String content;
    private int price;
    private int size;
    private String imgUrl;

}
