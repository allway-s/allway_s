package com.korit.allways_back.dto.response;

import lombok.Data;

@Data
public class KakaoReadyResponse {
    // 결제 고유 번호
    private String tid;

    // pc용 결제 url
    private String next_redirect_pc_url;

    // 준비 요청 시각
    private String created_at;
}
