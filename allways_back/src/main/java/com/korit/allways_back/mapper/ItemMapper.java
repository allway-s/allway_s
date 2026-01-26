package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ItemMapper {
    List<Item> findByCategoryName(@Param("categoryName") String categoryName);
}
