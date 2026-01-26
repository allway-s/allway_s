package com.korit.allways_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class OrderReqDto {
    private String address;          // 배송 주소
    private String detailAddress;    // 상세 주소
    private Integer totalPrice;      // 총 결제 금액
    private List<OrderItemReqDto> items; // 주문할 상품들
}