package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;

    @Transactional
    public Order createNewOrder(int userId, OrderReqDto orderReqDto) {

        Order order = Order.builder()
                .userId(userId)
                .totalPrice(orderReqDto.getTotalPrice())
                .build();

        orderMapper.insertOrder(order);

        List<OrderDetail> orderDetails = orderReqDto.getCartItems().stream().map(item -> OrderDetail.builder()
                .orderId(order.getOrderId())
                .productId(item.getItemId())
                .quantity(item.getCount())
                .unitPrice(0)
                .build()).toList();

        orderMapper.insertOrderDetails(order.getOrderId(), orderDetails);

        return order;
    }

    public List<OrderHistoryRespDto> getOrderHistory(int userId) {
        return orderMapper.getOrderHistory(userId);
    }


}
