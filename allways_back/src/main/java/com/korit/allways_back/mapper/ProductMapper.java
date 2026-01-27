package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {

    Integer findExistingProduct(
            @Param("itemId") Integer itemId,
            @Param("ingredientIds") List<Integer> ingredientIds,
            @Param("ingredientCount") Integer ingredientCount
    );

    int insertProduct(Product product);

    int insertProductItem(
            @Param("productId") Integer productId,
            @Param("itemId") Integer itemId
    );

    int insertProductIngredients(
            @Param("productId") Integer productId,
            @Param("ingredientIds") List<Integer> ingredientIds
    );

    Product findById(@Param("productId") Integer productId);

    List<Ingredient> findIngredientsByProductId(@Param("productId") Integer productId);

    int calculatePrice(@Param("productId") Integer productId);
}