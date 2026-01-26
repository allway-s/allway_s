package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.response.PresetRespDto;
import com.korit.allways_back.entity.Preset;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PresetMapper {
    // 프리셋 저장 (XML id: insert)
    void insert(Preset preset);

    // 사용자의 프리셋 목록 조회 (XML id: findByUserId)
    List<Preset> findByUserId(int userId);

    // 프리셋 단건 조회 (XML id: findById)
    Preset findById(int presetId);

    // 프리셋 삭제 (XML id: deleteById)
    int deleteById(@Param("userId") int userId, @Param("presetId") int presetId);

    // 사용자별 프리셋 개수 체크 (XML id: countByUserId)
    int countByUserId(int userId);

    // 이미 등록된 조합인지 확인 (XML id: existsByUserIdAndProductId)
    boolean existsByUserIdAndProductId(@Param("userId") int userId, @Param("productId") int productId);
}