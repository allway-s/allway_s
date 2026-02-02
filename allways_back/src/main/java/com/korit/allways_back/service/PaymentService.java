package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PaymentVerifyDto;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final OrderMapper orderMapper;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${portone.store-id}") // yml에 store-b927... 값을 넣으세요
    private String storeId;

    @Value("${portone.v2-api-secret}") // 새로 발급받은 V2 Secret
    private String v2ApiSecret;

    @Transactional
    public boolean verifyAndCompleteOrder(PaymentVerifyDto verifyDto) throws Exception {

        // 토큰 가져오기
        String accessToken = getV2AccessToken();

        // 2. V2 결제 상세 조회 API 호출
        // V2는 URL 구조가 다릅니다: https://api.portone.io/payments/{paymentId}
        String url = "https://api.portone.io/payments/" + verifyDto.getImpUid();

        HttpHeaders headers = new HttpHeaders();
        // 🚨 중요: V2는 "Bearer"가 아니라 "PortOne {token}" 형식을 사용합니다.
        headers.set("Authorization", "PortOne " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
            Map<String, Object> paymentData = response.getBody();

            if (paymentData == null) throw new RuntimeException("결제 내역 조회 실패");

            // V2 응답 객체에서 금액(amount)과 상태(status) 확인
            Map<String, Object> amountMap = (Map<String, Object>) paymentData.get("amount");
            int paidAmount = (int) amountMap.get("total"); // V2는 amount.total 구조인 경우가 많음
            String status = (String) paymentData.get("status");

            Integer dbTotalPrice = orderMapper.findTotalPriceByOrderNumber(verifyDto.getOrderNumber());

            System.out.println("✅ [V2] 포트원 결제 금액: " + paidAmount);
            System.out.println("✅ [V2] 결제 상태: " + status);

            if ("PAID".equals(status) && dbTotalPrice != null && paidAmount == dbTotalPrice) {
                orderMapper.updateStatus(verifyDto.getOrderNumber(), "PAID");
                return true;
            }
        } catch (Exception e) {
            System.err.println("❌ V2 검증 에러: " + e.getMessage());
            throw new RuntimeException("V2 결제 검증 중 오류 발생");
        }
        return false;
    }

    private String getV2AccessToken() {
        String url = "https://api.portone.io/login/api-secret";
        Map<String, String> body = new HashMap<>();
        body.put("apiSecret", v2ApiSecret);

        try {
            // V2는 응답 바디의 구조가 { "accessToken": "..." } 입니다.
            Map response = restTemplate.postForObject(url, body, Map.class);
            String token = (String) response.get("accessToken");
            System.out.println("✅ V2 토큰 발급 성공: " + token.substring(0, 10) + "...");
            return token;
        } catch (Exception e) {
            System.err.println("❌ V2 토큰 발급 실패: " + e.getMessage());
            throw new RuntimeException("V2 토큰 발급 실패");
        }
    }
}