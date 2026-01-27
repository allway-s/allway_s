package com.korit.allways_back.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class OrderItemReqDto {
    private Integer productId;       // 커스텀 상품 ID
    private Integer quantity;        // 수량
    private Integer unitPrice;       // 단가
    private Integer setId;           // 세트 ID (단품이면 null)
    private Integer selectedDrinkId; // 선택 음료 ID
    private Integer selectedSideId;  // 선택 사이드 ID
}