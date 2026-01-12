package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Product;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface productMapper {

    int insert(Product product);

}
