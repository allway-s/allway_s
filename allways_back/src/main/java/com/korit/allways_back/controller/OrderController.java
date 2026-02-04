package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.OrderCreateRequestDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /**
     * 주문 생성
     * POST /api/orders
     */
    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderCreateRequestDto dto) {
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        Order order = Order.builder()
                .userId(principalUser.getUser().getUserId())
                .address(dto.getOrder().getAddress())
                .detailAddress(dto.getOrder().getDetailAddress())
                .totalPrice(dto.getOrder().getTotalPrice())
                .build();

        List<OrderDetail> orderDetails = dto.getOrderDetails().stream()
                .map(detailDto -> OrderDetail.builder()
                        .productId(detailDto.getProductId())
                        .itemId(detailDto.getItemId())
                        .ingredientIds(detailDto.getIngredientIds())
                        .quantity(detailDto.getQuantity())
                        .setId(detailDto.getSetId())
                        .selectedDrinkId(detailDto.getSelectedDrinkId())
                        .selectedSideId(detailDto.getSelectedSideId())
                        .build())
                .toList();

        Order createdOrder = orderService.createOrder(order, orderDetails);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/history")
    public ResponseEntity<List<OrderDetail>> getOrderHistory() { // @RequestParam 삭제!
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        // 토큰에서 꺼낸 ID로 조회
        List<OrderDetail> history = orderService.getOrderHistory(principalUser.getUser().getUserId());
        return ResponseEntity.ok(history);
    }

    /**
     * 주문 조회 (by ID)
     * GET /api/orders/1
     */
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Integer orderId) {
        Order order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }

    /**
     * 주문 상세 목록 조회
     * GET /api/orders/1/details
     */
    @GetMapping("/{orderId}/details")
    public ResponseEntity<List<OrderDetail>> getOrderDetails(@PathVariable Integer orderId) {
        List<OrderDetail> details = orderService.getOrderDetails(orderId);
        return ResponseEntity.ok(details);
    }

    @PutMapping("/{orderNumber}/cancel")
    public ResponseEntity<?> cancelOrder(@PathVariable String orderNumber) {
        try {
            orderService.cancelOrder(orderNumber);
            return ResponseEntity.ok("주문이 취소되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("주문 취소 중 오류 발생: " + e.getMessage());
        }
    }
}