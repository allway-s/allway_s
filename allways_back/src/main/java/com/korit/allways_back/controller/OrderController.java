package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.OrderCreateRequestDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.service.OrderService;
import lombok.RequiredArgsConstructor;
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
        Order order = Order.builder()
                .userId(dto.getOrder().getUserId())
                .address(dto.getOrder().getAddress())
                .detailAddress(dto.getOrder().getDetailAddress())
                .totalPrice(dto.getOrder().getTotalPrice())
                .build();

        List<OrderDetail> orderDetails = dto.getOrderDetails().stream()
                .map(detailDto -> OrderDetail.builder()
                        .productId(detailDto.getProductId())
                        .quantity(detailDto.getQuantity())
                        .setId(detailDto.getSetId())
                        .selectedDrinkId(detailDto.getSelectedDrinkId())
                        .selectedSideId(detailDto.getSelectedSideId())
                        .build())
                .toList();

        Order createdOrder = orderService.createOrder(order, orderDetails);
        return ResponseEntity.ok(createdOrder);
    }

    /**
     * 사용자 주문 내역 조회
     * GET /api/orders/history?userId=1
     */
    @GetMapping("/history")
    public ResponseEntity<List<OrderDetail>> getOrderHistory(@RequestParam Integer userId) {
        List<OrderDetail> history = orderService.getOrderHistory(userId);
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

    // Helper methods
    private Order mapToOrder(Object obj) {
        Map<String, Object> map = (Map<String, Object>) obj;
        return Order.builder()
                .userId((Integer) map.get("userId"))
                .address((String) map.get("address"))
                .detailAddress((String) map.get("detailAddress"))
                .build();
    }

    private List<OrderDetail> mapToOrderDetails(Object obj) {
        List<Map<String, Object>> list = (List<Map<String, Object>>) obj;
        return list.stream().map(map -> OrderDetail.builder()
                .productId((Integer) map.get("productId"))
                .quantity((Integer) map.get("quantity"))
                .setId((Integer) map.get("setId"))
                .selectedDrinkId((Integer) map.get("selectedDrinkId"))
                .selectedSideId((Integer) map.get("selectedSideId"))
                .build()
        ).toList();
    }
}