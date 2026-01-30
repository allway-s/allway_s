package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetail {
    private Integer orderDetailId;
    private Integer orderId;
    private Integer productId;

    // ✅ Product 생성을 위한 필드 추가
    private Integer itemId;
    private List<Integer> ingredientIds;

    private Integer quantity;
    private Integer unitPrice;

    // 세트메뉴 관련
    private Integer setId;
    private Integer selectedDrinkId;
    private Integer selectedSideId;

    // 조회 시 함께 가져올 정보들 (화면 표시용)
    private String itemName;
    private String imgUrl;
    private String size;
    private List<String> ingredientNames;
}