package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.response.PresetRespDto;
import com.korit.allways_back.entity.Preset;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PresetMapper {

    int insert(Preset preset);

    List<Preset> findByUserId(@Param("userId") Integer userId);

    Preset findById(@Param("presetId") Integer presetId);

    int deleteById(
            @Param("presetId") Integer presetId,
            @Param("userId") Integer userId
    );

    int countByUserId(@Param("userId") Integer userId);

    boolean existsByUserIdAndProductId(
            @Param("userId") Integer userId,
            @Param("productId") Integer productId
    );
}