package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService; // 주문 서비스

    @PostMapping // 주문 생성
    public ResponseEntity<?> placeOrder(@AuthenticationPrincipal PrincipalUser principalUser,
                                        @RequestBody OrderReqDto orderReqDto) {
        // 1. 시큐리티 세션에서 현재 로그인한 사용자의 ID를 가져옴
        int userId = principalUser.getUser().getUserId();
        // 2. 서비스 로직을 통해 주문을 생성하고 생성된 주문 번호를 받음
        String orderNumber = orderService.createOrder(userId, orderReqDto);
        // 3. 성공 시 주문 번호를 클라이언트에 반환
        return ResponseEntity.status(HttpStatus.CREATED).body(orderNumber);
    }
}