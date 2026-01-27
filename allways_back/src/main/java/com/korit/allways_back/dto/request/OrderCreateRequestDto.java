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
        private Integer productId; // 커스텀 상품 ID
        private Integer unitPrice; // 주문 시점 가격
        private Integer quantity; // 수량
        private Integer setId; // 세트 ID (null 허용)
        private Integer selectedDrinkId; // 선택 음료
        private Integer selectedSideId; // 선택 사이드
    }
}