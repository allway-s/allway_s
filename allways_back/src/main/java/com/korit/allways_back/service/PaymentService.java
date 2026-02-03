package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PaymentVerifyDto;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Slf4j
@Service
public class PaymentService {

    private final OrderMapper orderMapper;
    private final RestTemplate restTemplate = new RestTemplate();
    private String v2ApiSecret;

    public PaymentService(OrderMapper orderMapper, @Value("${portone.v2-api-secret}") String v2ApiSecret) {
        this.orderMapper = orderMapper;
        this.v2ApiSecret = v2ApiSecret;
    }

    @Transactional
    public boolean verifyAndCompleteOrder(PaymentVerifyDto verifyDto) throws Exception {
        String paymentId = verifyDto.getPaymentId();
        String orderNumber = verifyDto.getOrderNumber();

        log.info("결제 검증 시작 - paymentId: {}, orderNumber: {}", paymentId, orderNumber);

        // V2 API Secret 사용
        String url = "https://api.portone.io/payments/" + paymentId;

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "PortOne " + v2ApiSecret);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            log.info("포트원 응답: {}", responseBody);

            // V2 응답 구조
            String status = (String) responseBody.get("status");
            Map<String, Object> amount = (Map<String, Object>) responseBody.get("amount");
            Integer totalAmount = (Integer) amount.get("total");

            Integer dbPrice = orderMapper.findTotalPriceByOrderNumber(orderNumber);

            log.info("결제 상태: {}, 포트원 금액: {}, DB 금액: {}", status, totalAmount, dbPrice);

            if ("PAID".equals(status) && dbPrice != null && totalAmount.equals(dbPrice)) {
                orderMapper.updateStatus(orderNumber, "PAID");
                log.info("결제 검증 성공");
                return true;
            } else {
                log.warn("결제 검증 실패 - 상태 또는 금액 불일치");
                return false;
            }

        } catch (Exception e) {
            log.error("결제 검증 중 오류 발생: {}", e.getMessage(), e);
            throw new Exception("결제 검증 실패", e);
        }
    }
}