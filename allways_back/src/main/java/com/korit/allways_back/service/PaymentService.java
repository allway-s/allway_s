package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PaymentVerifyDto;
import com.korit.allways_back.mapper.OrderMapper;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final IamportClient iamportClient;
    private final OrderMapper orderMapper;

    @Transactional
    public boolean verifyAndCompleteOrder(PaymentVerifyDto verifyDto) throws Exception {
        // 포트원 서버에서 결제된 정보 가져오기
        IamportResponse<Payment> response = iamportClient.paymentByImpUid(verifyDto.getImpUid());
        Payment payment = response.getResponse();

        // 포트원 조회 결과가 없는 경우
        if (payment == null) {
            throw new RuntimeException("결제 내역을 찾을 수 없음");
        }

        // DB에서 총액 조회
        Integer dbTotalPrice = orderMapper.findTotalPriceByOrderNumber(verifyDto.getOrderNumber());

        // DB에 주문이 없는 경우
        if (dbTotalPrice == null) {
            throw new RuntimeException("DB에 해당 주문이 존재하지 않음");
        }

        // 포트원 결제 금액과 DB 금액 비교
        if (payment.getAmount().intValue() == dbTotalPrice) {
            orderMapper.updateStatus(verifyDto.getOrderNumber(), "PAID");
            return true;
        }
        return false;
    }


}
