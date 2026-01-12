package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    int insertOrder(Order order); // orderId가 여기 주입됨

    int insertOrderDetails(
            @Param("orderId") int orderId,
            @Param("orderDetails") List<OrderDetail> orderDetails
    );
}
