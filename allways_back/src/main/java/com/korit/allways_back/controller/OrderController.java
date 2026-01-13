package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody OrderReqDto orderReqDto,
            @RequestParam int userId
    ) {

        Order order = orderService.createNewOrder(userId, orderReqDto);

        return ResponseEntity.status(201).body(order);
    }

    @GetMapping("/history")
    public ResponseEntity<List<OrderHistoryRespDto>> getOrderHistory(@RequestParam int userId) {

        return ResponseEntity.ok(orderService.getOrderHistory(userId));

    }
}