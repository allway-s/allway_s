package com.korit.allways_back.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class OrderCreateRequestDto {
    private OrderRequestDto order; // 주문 기본 정보
    private List<OrderDetailRequestDto> orderDetails; // 상세 상품 목록

    @Getter
    @Setter
    public static class OrderRequestDto {
        private Integer userId; // 주문자 ID
        private String address; // 배송 주소
        private String detailAddress; // 상세 주소
        private Integer totalPrice; // 전체 가격
    }

    @Getter
    @Setter
    public static class OrderDetailRequestDto {
        private Integer productId;
        private Integer itemId;
        private List<Integer> ingredientIds;

        private Integer unitPrice;
        private Integer quantity;
        private Integer setId;
        private Integer selectedDrinkId;
        private Integer selectedSideId;
    }

}