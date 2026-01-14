package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.OrderItemReqDto;
import com.korit.allways_back.dto.request.OrderReqDto;
import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.mapper.OrderMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderMapper orderMapper;
    private final ProductService productService;

    @Transactional
    public Order createOrder(int userId, OrderReqDto orderReqDto) {
        int calculatedTotalPrice = 0;

        // [작동 방식] 주문 리스트를 하나씩 꺼내어 서버 내부에서 체크합니다.
        for (OrderItemReqDto item : orderReqDto.getOrders()) {

            // [수정] ProductService를 활용해 상품 ID를 확보합니다. (리스트로 따로 체크할 필요 없이 여기서 처리)
            Integer productId = productService.findOrCreateProduct(
                    item.getItemId(),
                    item.getIngredientIds()
            );

            // [작동 방식] 확보한 ID를 item 객체에 담습니다. (나중에 insertOrderDetails에서 사용)
            item.setProductId(productId);

            // [작동 방식] 해당 상품의 정확한 단가를 계산해 옵니다.
            int unitPrice = orderMapper.getProductPrice(productId);
            item.setUnitPrice(unitPrice);

            // [작동 방식] 서버가 직접 계산한 총액을 누적합니다.
            calculatedTotalPrice += unitPrice * item.getQuantity();
        }

        // [작동 방식] 주문 마스터 저장
        Order order = Order.builder()
                .userId(userId)
                .totalPrice(calculatedTotalPrice)
                .build();
        orderMapper.insertOrder(order);

        // [작동 방식] 주문 상세 일괄 저장 (위에서 채운 productId와 unitPrice가 활용됨)
        orderMapper.insertOrderDetails(order.getOrderId(), orderReqDto.getOrders());

        return order;
    }


    public List<OrderHistoryRespDto> getOrderHistory(int userId) {
        return orderMapper.getOrderHistory(userId);
    }
}