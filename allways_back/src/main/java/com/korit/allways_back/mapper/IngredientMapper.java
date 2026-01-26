package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Ingredient;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface IngredientMapper {
    List<Ingredient> findByCategoryName(@Param("categoryName") String categoryName);
}