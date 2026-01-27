package com.korit.allways_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoReadyRequest {
    private String cid;                 // 가맹점 코드( TC0ONETIME )
    private String partner_order_id;    // 가맹점 주문번호( 만든 주문번호 )
    private String partner_user_id;     // user_id
    private String item_name;           // 상품명 ( ~외 1건)
    private Integer quantity;           // 수량
    private Integer total_amount;       // 총 결제 금액
    private Integer tax_free_amount;    // 상품 비과세 금액( 0 원 예정)
    private String approval_url;        // 결제 성공 시 리다이렉트 URL
    private String fail_url;            // 결제 실패 시 리다이렉트 URL
    private String cancel_url;          // 결제 취소 시 리다이렉트 URL
}
