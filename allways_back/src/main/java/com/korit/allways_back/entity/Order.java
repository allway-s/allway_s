package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Order {

    private int orderId;
    private int userId;
    private int totalPrice;
    private LocalDateTime orderedAt;
    private List<Integer> productIds;
    private List<Product> products;

}
