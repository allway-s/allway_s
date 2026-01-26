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
public class Order {

    private Integer orderId;
    private Integer userId;
    private String orderNumber;
    private Integer totalPrice;
    private LocalDateTime orderedAt;
    private String address;
    private String detailAddress;

    // 조인용
    private List<OrderDetail> orderDetails;
    private String deliveryAddress;
}