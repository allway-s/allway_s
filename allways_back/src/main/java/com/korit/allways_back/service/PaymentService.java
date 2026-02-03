package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PaymentVerifyDto;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
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

    @Value("${portone.v2-api-secret}")
    private String v2ApiSecret;

    @Transactional
    public boolean verifyAndCompleteOrder(PaymentVerifyDto verifyDto) throws Exception {
        String paymentId = verifyDto.getPaymentId();
        String orderNumber = verifyDto.getOrderNumber();
        String accessToken = getV2AccessToken();

        // 결제 내역 단건 조회
        String url = "https://api.portone.io/payments/" + paymentId;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + accessToken);
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, entity, Map.class);
        Map<String, Object> payment = response.getBody();

        // 상태 및 금액 검증
        // V2 응답 구조: payment.status, payment.amount.total
        String status = (String) payment.get("status");
        Map<String, Object> amount = (Map<String, Object>) payment.get("amount");
        int totalAmount = (int) amount.get("total");

        Integer dbPrice = orderMapper.findTotalPriceByOrderNumber(orderNumber);

        if ("PAID".equals(status) && dbPrice != null && totalAmount == dbPrice) {
            orderMapper.updateStatus(orderNumber, "PAID");
            return true;
        }
        return false;
    }

    private String getV2AccessToken() {
        String url = "https://api.portone.io/login/api-secret";
        Map<String, String> body = new HashMap<>();
        body.put("apiSecret", v2ApiSecret);

        try {
            // V2 응답 구조 { "accessToken": "..." }
            Map response = restTemplate.postForObject(url, body, Map.class);

            if (response == null || !response.containsKey("accessToken")) {
                throw new RuntimeException("응답에 토큰이 없습니다.");
            }

            String token = (String) response.get("accessToken");
            System.out.println("토큰 발급 성공: " + token.substring(0, 10));
            return token;
        } catch (Exception e) {
            System.err.println("V2 토큰 발급 실패: " + e.getMessage());
            throw new RuntimeException("V2 토큰 발급 실패", e);
        }
    }
}