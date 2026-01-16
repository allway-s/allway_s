package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.response.PresetRespDto;
import com.korit.allways_back.entity.Preset;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PresetMapper {

    void createPreset(Preset preset);

    List<Preset> findByUserId(int userId);

    List<PresetRespDto> orderToPreset(int productId);

    void deleteById(
            @Param("userId") int userId,
            @Param("productId") int productId);

}
