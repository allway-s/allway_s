package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.response.PresetRespDto;
import com.korit.allways_back.entity.Preset;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PresetMapper {

    // [기존] 프리셋 생성
    void createPreset(Preset preset);

    // [기존] 유저별 프리셋 목록 조회
    List<Preset> findByUserId(int userId);

    // [기존] 주문 정보를 프리셋 형태로 변환
    List<PresetRespDto> orderToPreset(@Param("productId") int productId);

    // [기존] 특정 프리셋 삭제
    void deleteById(
            @Param("userId") int userId,
            @Param("productId") int productId);

    // --- 추가된 메소드 (작동 방식 위주 설명) ---

    int countByUserId(int userId);

    boolean existsByUserIdAndProductId(
            @Param("userId") int userId,
            @Param("productId") int productId);

}