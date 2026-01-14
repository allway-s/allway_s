package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody OrderReqDto orderReqDto
    ) {
        int userId;
        if (principalUser != null && principalUser.getUser() != null) {
            userId = principalUser.getUser().getUserId();
        } else {
            userId = orderReqDto.getUserId();
        }

        Order order = orderService.createOrder(userId, orderReqDto);

        return ResponseEntity.ok(order);
    }


    @GetMapping("/history")
    public ResponseEntity<List<OrderHistoryRespDto>> getOrderHistory(
            @AuthenticationPrincipal PrincipalUser principalUser
    ) {
        if (principalUser == null || principalUser.getUser() == null) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.ok(
                orderService.getOrderHistory(principalUser.getUser().getUserId())
        );
    }
}