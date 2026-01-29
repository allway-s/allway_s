package com.korit.allways_back.dto.request;

import lombok.Data;

@Data
public class PaymentVerifyDto {
    private String impUid;
    private String orderNumber;
}
