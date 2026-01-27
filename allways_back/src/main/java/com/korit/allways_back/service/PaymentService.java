package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.KakaoReadyRequest;
import com.korit.allways_back.dto.response.KakaoApproveResponse;
import com.korit.allways_back.dto.response.KakaoReadyResponse;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final WebClient kakaoWebClient;

    @Value("${kakao.pay.secret-key}")
    private String secretKey;
    @Value("${kakao.pay.cid}")
    private String cid;

    public KakaoReadyResponse payReady(KakaoReadyRequest requestDto) {
        return kakaoWebClient.post()
                // 요청 url
                .uri("/online/v1/payment/ready")
                // 헤더
                .header("Authorization", "SECRET_KEY " + secretKey)
                // 데이터
                .bodyValue(requestDto)
                // 요청 실행
                .retrieve()
                // 응답 TYPE
                .bodyToMono(KakaoReadyResponse.class)
                // 비동기처리를 동기처리 처럼 대기
                .block();
    }

    public KakaoApproveResponse payApprove(String tid, String pgToken) {
        // 승인 요청에 필요한 데이터를 Map이나 DTO에 담습니다.
        Map<String, Object> parameters = new HashMap<>();
        parameters.put("cid", cid);
        parameters.put("tid", tid);
        parameters.put("partner_order_id", "주문번호"); // 준비 단계와 동일해야 함
        parameters.put("partner_user_id", "유저ID");  // 준비 단계와 동일해야 함
        parameters.put("pg_token", pgToken);      // 카카오가 준 토큰

        return kakaoWebClient.post()
                .uri("/online/v1/payment/approve")
                .header("Authorization", "SECRET_KEY " + secretKey)
                .bodyValue(parameters)
                .retrieve()
                .bodyToMono(KakaoApproveResponse.class)
                .block();
    }

}
