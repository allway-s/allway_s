package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;

    @Transactional
    public String createOrder(int userId, OrderReqDto orderReqDto) {
        // 1. 고유한 주문 번호 생성 (예: 날짜 + 나노초)
        String orderNumber = "ORD-" + System.currentTimeMillis();

        // 2. Order 엔티티 생성 및 기본 정보 저장
        Order order = Order.builder()
                .userId(userId)
                .orderNumber(orderNumber)
                .totalPrice(orderReqDto.getTotalPrice())
                .address(orderReqDto.getAddress())
                .detailAddress(orderReqDto.getDetailAddress())
                .build();

        // insertOrder 호출 (DB에 마스터 정보 저장)
        orderMapper.insertOrder(order);

        // 3. 주문 상세 항목들(Items) 저장
        // XML의 <foreach>를 사용하여 일괄 삽입(Batch Insert) 처리
        orderMapper.insertOrderDetails(order.getOrderId(), orderReqDto.getItems());

        return orderNumber;
    }
}