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
    private Integer unitPrice; // 주문 시점 가격 (히스토리 보존)
    private Integer quantity;
    private Integer setId; // 선택한 세트
    private Integer selectedDrinkId;
    private Integer selectedSideId;

    // 조인용 필드 (필요시)
    private Order order;
    private Product product;
    private SetMenu setMenu;
}