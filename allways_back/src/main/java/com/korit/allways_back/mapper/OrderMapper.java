package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.request.OrderItemReqDto;
import com.korit.allways_back.dto.response.OrderHistoryRespDto;
import com.korit.allways_back.entity.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {

    void insertOrder(Order order);

    void insertOrderDetails(
            @Param("orderId") int orderId,
            @Param("items") List<OrderItemReqDto> items
    );

    List<OrderHistoryRespDto> getOrderHistory(@Param("userId") int userId);

    int getProductPrice(int productId);
}
