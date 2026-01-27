package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductItem {

    private Integer productItemId;
    private Integer productId;
    private Integer itemId;

    // 조인용 필드 (필요시)
    private Product product;
    private Item item;
}