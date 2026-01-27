package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {

    Integer findExistingProduct(
            @Param("itemId") int itemId,
            @Param("ingredientIds") List<Integer> ingredientIds,
            @Param("ingredientCount") int ingredientCount
    );

    void insertProduct(Product product);

    int insertProductItem(@Param("productId") int productId, @Param("itemId") int itemId);

    int insertProductIngredients(
            @Param("productId") int productId,
            @Param("ingredientIds") List<Integer> ingredientIds
    );

    int calculatePrice(int productId);
}