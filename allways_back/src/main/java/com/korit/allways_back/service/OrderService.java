package com.korit.allways_back.service;

import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import com.korit.allways_back.entity.Product;
import com.korit.allways_back.mapper.OrderMapper;
import com.korit.allways_back.mapper.ProductMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;
    private final ProductMapper productMapper;
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

        int totalPrice = 0;

        for (OrderDetail detail : orderDetails) {
            // ✅ productId가 null이거나 존재하지 않으면 생성
            Integer productId = detail.getProductId();

            if (productId == null || !productExists(productId)) {
                log.info("Product가 존재하지 않음. 새로 생성합니다. itemId: {}, productId: {}",
                        detail.getItemId(), productId);

                // ✅ itemId와 ingredientIds로 product 생성/조회
                productId = productService.createOrFindProduct(
                        detail.getItemId(),
                        detail.getIngredientIds(),
                        false
                );

                detail.setProductId(productId);
                log.info("Product 생성 완료. productId: {}", productId);
            }

            int itemPrice = 0;

            try {
                // 세트메뉴인 경우
                if (detail.getSetId() != null && detail.getSetId() != 1) {
                    itemPrice = calculateSetPrice(detail);
                } else {
                    // 일반 상품 가격 계산
                    Integer price = productService.calculateProductPrice(productId);
                    if (price == null) {
                        log.error("상품 가격이 null입니다. productId: {}", productId);
                        throw new IllegalArgumentException("상품 가격을 계산할 수 없습니다.");
                    }
                    itemPrice = price;
                }
            } catch (Exception e) {
                log.error("상품 가격 계산 실패. productId: {}, error: {}", productId, e.getMessage());
                throw new IllegalArgumentException(
                        "상품 가격 계산 실패. productId: " + productId, e
                );
            }

            detail.setUnitPrice(itemPrice);
            totalPrice += itemPrice * detail.getQuantity();
        }

        order.setTotalPrice(totalPrice);

        // 주문 저장
        orderMapper.insertOrder(order);

        // 주문 상세 저장
        orderMapper.insertOrderDetails(order.getOrderId(), orderDetails);

        log.info("주문 생성 완료. orderId: {}, orderNumber: {}, totalPrice: {}",
                order.getOrderId(), order.getOrderNumber(), order.getTotalPrice());

        return order;
    }

    /**
     * Product 존재 여부 확인
     */
    private boolean productExists(Integer productId) {
        try {
            Product product = productMapper.findById(productId);
            return product != null;
        } catch (Exception e) {
            log.warn("Product 조회 실패. productId: {}", productId);
            return false;
        }
    }

    /**
     * 세트 가격 계산 (음료 + 사이드 추가 금액 포함)
     */
    private int calculateSetPrice(OrderDetail detail) {
        // 기본 상품 가격
        Integer basePrice = productService.calculateProductPrice(detail.getProductId());

        if (basePrice == null) {
            log.error("세트 기본 가격이 null입니다. productId: {}", detail.getProductId());
            throw new IllegalArgumentException("상품 가격을 계산할 수 없습니다.");
        }

        // 음료 가격
        int drinkPrice = 0;
        if (detail.getSelectedDrinkId() != null) {
            drinkPrice = setMenuService.getIngredientPrice(detail.getSelectedDrinkId());
        }

        // 사이드 가격
        int sidePrice = 0;
        if (detail.getSelectedSideId() != null) {
            sidePrice = setMenuService.getIngredientPrice(detail.getSelectedSideId());
        }

        int totalPrice = basePrice + drinkPrice + sidePrice;

        log.info("세트 가격 계산 완료. productId: {}, base: {}, drink: {}, side: {}, total: {}",
                detail.getProductId(), basePrice, drinkPrice, sidePrice, totalPrice);

        return totalPrice;
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