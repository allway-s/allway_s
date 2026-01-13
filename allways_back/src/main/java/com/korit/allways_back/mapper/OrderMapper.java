package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Order;
import com.korit.allways_back.entity.OrderDetail;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {

    void insertOrder(Order order);

    int insertOrderDetails(
            @Param("orderId") int orderId,
            @Param("orderDetails") List<OrderDetail> orderDetails
    );

    void getOrderHistory();

}
