package com.korit.allways_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderItemReqDto {

    private int orderId;
    private int productId;
    private int unitPrice;
    private int quantity;

}
