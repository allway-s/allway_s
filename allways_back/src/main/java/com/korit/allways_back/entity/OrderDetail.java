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

    // ✅ 조회 시 함께 가져올 정보들 (화면 표시용)
    private String orderNumber;        // 주문번호
    private LocalDateTime orderedAt;   // 주문일시
    private String itemName;           // 아이템명
    private String imgUrl;             // 이미지 URL
    private String size;               // 사이즈 (15cm, 30cm)
    private String setName;            // 세트명
    private String drinkName;          // 선택한 음료명
    private String sideName;           // 선택한 사이드명
    private List<String> ingredientNames;  // 재료명 리스트 (프론트에서 사용하지 않음, productIngredient API 사용)
}