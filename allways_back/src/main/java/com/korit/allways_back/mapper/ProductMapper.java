package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {

    Integer findExistingProductId(
            @Param("itemId") int itemId,
            @Param("ingredientIds") List<Integer> ingredientIds,
            @Param("ingredientCount") int ingredientCount
    );

    void insertProduct(Product product);

    int insertProductDetails(
            @Param("productId") int productId,
            @Param("itemId") int itemId,
            @Param("ingredientIds") List<Integer> ingredientIds
    );

}
