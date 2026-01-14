package com.korit.allways_back.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemReqDto {

    private int itemId;
    private List<Integer> ingredientIds;
    private int quantity;

    @Schema(hidden = true)
    private int productId;

    @Schema(hidden = true)
    private int unitPrice;

}
