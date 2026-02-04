package com.korit.allways_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 주문 내역 응답 DTO
 * - 주문 정보 + 주문 상세 아이템 목록
 * - 프론트엔드 RecentOrder 페이지에서 사용
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderHistoryRespDto {

    // 주문 정보
    private String orderNumber;
    private LocalDateTime orderedAt;
    private int totalPrice;
    private int totalQuantity;
    private String status;

    // 주문 상세 아이템 목록
    private List<OrderDetailDto> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderDetailDto {

        private int productId;
        private String itemName;
        private String imgUrl;        // ✅ 이미지 URL 추가
        private String size;          // ✅ 사이즈 추가 (15cm, 30cm)
        private String setName;
        private String drinkName;     // ✅ 선택한 음료명
        private String sideName;      // ✅ 선택한 사이드명
        private int quantity;
        private int unitPrice;

    }
}