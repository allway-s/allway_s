package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {

    /**
     * 주문 생성
     */
    int insertOrder(Order order);

    /**
     * 주문 상세 목록 생성
     * @param orderId 주문 ID
     * @param items 주문 상세 아이템 리스트
     */
    int insertOrderDetails(
            @Param("orderId") Integer orderId,
            @Param("items") List<OrderDetail> items
    );

    /**
     * 사용자 주문 내역 조회
     * @param userId 사용자 ID
     * @return 주문 상세 내역 리스트 (최신순)
     */
    List<OrderDetail> findOrderHistoryByUserId(@Param("userId") Integer userId);

    /**
     * 주문 ID로 주문 정보 조회
     */
    Order findOrderById(@Param("orderId") Integer orderId);

    /**
     * 주문 ID로 주문 상세 목록 조회
     */
    List<OrderDetail> findOrderDetailsByOrderId(@Param("orderId") Integer orderId);
}