package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetail {

    private int orderDetailId;
    private int orderId;
    private int productId;
    private int unitPrice;
    private int quantity;

}