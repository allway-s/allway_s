package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {

    private Integer orderDetailId;
    private Integer orderId;
    private Integer productId;
    private Integer unitPrice;
    private Integer quantity;
    private Integer setId;
    private Integer selectedDrinkId;
    private Integer selectedSideId;

    // 조인용
    private String itemName;
    private Integer itemSize;
    private String ingredientsText;
    private String setName;
    private String drinkName;
    private String sideName;
}