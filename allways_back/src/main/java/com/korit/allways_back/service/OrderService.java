package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.OrderItemReqDto;
import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;

    @Transactional
    public Order createOrder(int userId, OrderReqDto orderReqDto) {

        Order order = Order.builder()
                .userId(userId)
                .totalPrice(orderReqDto.getTotalPrice())
                .build();

        orderMapper.insertOrder(order);

        List<OrderItemReqDto> orderItems = orderReqDto.getOrders();
        for (OrderItemReqDto item : orderItems) {
            item.setOrderId(order.getOrderId());
        }

        orderMapper.insertOrderDetails(order.getOrderId(), orderReqDto.getOrders());

        return order;
    }


    public List<OrderHistoryRespDto> getOrderHistory(int userId) {
        return orderMapper.getOrderHistory(userId);
    }
}