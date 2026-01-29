package com.korit.allways_back.service;

import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;
    private final ProductService productService;
    private final SetMenuService setMenuService;

    /**
     * 주문 생성
     */
    @Transactional
    public Order createOrder(Order order, List<OrderDetail> orderDetails) {
        // 주문번호 생성
        String orderNumber = generateOrderNumber();
        order.setOrderNumber(orderNumber);

        // 총 금액 계산
        int totalPrice = 0;
        for (OrderDetail detail : orderDetails) {
            // 상품 가격 계산
            int productPrice = productService.calculateProductPrice(detail.getProductId());
            detail.setUnitPrice(productPrice);

            // 세트 선택 시 유효성 검증
            if (detail.getSetId() != null) {
                // 음료/사이드 미선택 시 즉시 예외 발생 (방어적 코드)
                if (detail.getSelectedDrinkId() == null || detail.getSelectedSideId() == null) {
                    throw new IllegalArgumentException("세트 선택 시 음료와 사이드를 모두 선택해야 합니다.");
                }

                // 실제 해당 세트에 포함될 수 있는 구성품인지 DB 기반 검증
                boolean valid = setMenuService.validateSetSelection(
                        detail.getSetId(),
                        detail.getSelectedDrinkId(),
                        detail.getSelectedSideId()
                );

                if (!valid) {
                    throw new IllegalArgumentException("유효하지 않은 세트 구성입니다.");
                }
            }

            totalPrice += productPrice * detail.getQuantity();
        }

        order.setTotalPrice(totalPrice);

        orderMapper.insertOrder(order);

        orderMapper.insertOrderDetails(order.getOrderId(), orderDetails);

        return order;
    }

    /**
     * 사용자 주문 내역 조회
     */
    public List<OrderDetail> getOrderHistory(Integer userId) {
        return orderMapper.findOrderHistoryByUserId(userId);
    }

    /**
     * 주문 ID로 주문 조회
     */
    public Order getOrderById(Integer orderId) {
        Order order = orderMapper.findOrderById(orderId);
        if (order == null) {
            throw new IllegalArgumentException("존재하지 않는 주문입니다.");
        }
        return order;
    }

    /**
     * 주문 ID로 주문 상세 목록 조회
     */
    public List<OrderDetail> getOrderDetails(Integer orderId) {
        return orderMapper.findOrderDetailsByOrderId(orderId);
    }

    /**
     * 주문번호 생성
     * 형식: ORD + YYYYMMDD + 일련번호(3자리)
     * 예: ORD20260127001
     */
    private String generateOrderNumber() {
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        // 실제로는 DB에서 오늘 날짜의 마지막 주문번호를 조회하여 +1
        // 여기서는 간단히 랜덤 3자리로 처리
        int random = (int) (Math.random() * 1000);
        return String.format("ORD%s%03d", dateStr, random);
    }
}