package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProductMapper {

    /**
     * 상품 생성
     */
    void insertProduct(Product product);

    /**
     * 상품-아이템 연결
     */
    int insertProductItem(@Param("productId") Integer productId, @Param("itemId") Integer itemId);

    /**
     * 상품-재료 연결
     */
    int insertProductIngredients(@Param("productId") Integer productId, @Param("ingredientIds") List<Integer> ingredientIds);

    /**
     * 기존 상품 찾기 (중복 체크)
     */
    Integer findExistingProduct(
            @Param("itemId") Integer itemId,
            @Param("ingredientIds") List<Integer> ingredientIds,
            @Param("ingredientCount") Integer ingredientCount
    );

    /**
     * 상품 ID로 조회
     */
    Product findById(@Param("productId") Integer productId);

    /**
     * 상품의 재료 목록 조회
     */
    List<Ingredient> findIngredientsByProductId(@Param("productId") Integer productId);

    /**
     * 상품 가격 계산 (아이템 가격 + 재료 가격)
     */
    Integer calculatePrice(@Param("productId") Integer productId);
}