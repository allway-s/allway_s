package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.SetComponent;
import com.korit.allways_back.entity.SetMenu;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface SetMapper {

    List<SetMenu> findAllSets();

    SetMenu findById(@Param("setId") Integer setId);

    List<SetComponent> findComponentsBySetId(@Param("setId") Integer setId);

    List<Ingredient> findSelectableIngredients(@Param("categoryId") Integer categoryId);
}