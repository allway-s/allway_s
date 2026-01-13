package com.korit.allways_back.service;

import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;

    public Order createNewOrder(int userId, int totalPrice, List<Integer> productIds) {

        Order order = Order.builder()
                .userId(userId)
                .totalPrice(totalPrice)
                .orderedAt(LocalDateTime.now())
                .build();

        orderMapper.insertOrder(order);

        List<OrderDetail> orderDetails = productIds.stream().map(pid -> OrderDetail.builder()
                .orderId(order.getOrderId())
                .productId(pid)
                .quantity(1)
                .build()).toList();

        orderMapper.insertOrderDetails(order.getOrderId(), orderDetails);

        return order;
    }

    public OrderHistoryRespDto getOrderHistory() {
        return orderMapper.getOrderHistory();
    }


}
