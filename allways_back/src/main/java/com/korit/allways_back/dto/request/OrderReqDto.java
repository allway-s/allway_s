package com.korit.allways_back.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderReqDto {
    private List<CartItemDto> cartItems;
    private int totalPrice;
}
