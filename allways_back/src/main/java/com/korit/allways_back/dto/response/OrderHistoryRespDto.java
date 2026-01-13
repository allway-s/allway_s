package com.korit.allways_back.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderHistoryRespDto {

    private LocalDateTime orderedAt;
    private String productName;
    private List<String> ingredients;
    private int unitPrice;
    private int totalPrice;

}
