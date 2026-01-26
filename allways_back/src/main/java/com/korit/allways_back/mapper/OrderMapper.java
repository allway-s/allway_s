package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.request.OrderItemReqDto;
import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    // 주문 생성 (XML id: insertOrder)
    void insertOrder(Order order);

    // 주문 상세 일괄 삽입 (XML id: insertOrderDetails)
    void insertOrderDetails(
            @Param("orderId") int orderId,
            @Param("items") List<OrderItemReqDto> items
    );

    List<OrderDetail> findOrderHistoryByUserId(@Param("userId") int userId);


}