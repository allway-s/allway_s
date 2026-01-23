package com.korit.allways_back.service;

import com.korit.allways_back.dto.response.PresetRespDto;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.mapper.PostMapper;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PresetService {

    private final PresetMapper presetMapper;
    private final PostMapper postMapper; // 🔥 PostMapper 주입 추가

    public Map<Integer, List<Integer>> getPresetMap(int productId) {
        List<PresetRespDto> rows = presetMapper.orderToPreset(productId);

        return rows.stream()
                .collect(Collectors.groupingBy(
                        PresetRespDto::getItemId,
                        Collectors.mapping(PresetRespDto::getIngredientId, Collectors.toList())
                ));
    }

    @Transactional
    public void scrapPreset(int userId, int productId, String presetName) {

        int currentCount = presetMapper.countByUserId(userId);
        if (currentCount >= 10) {
            throw new RuntimeException("프리셋은 최대 10개까지만 저장할 수 있습니다. 기존 프리셋을 삭제해주세요.");
        }

        if (presetMapper.existsByUserIdAndProductId(userId, productId)) {
            throw new RuntimeException("이미 동일한 상품 구성의 프리셋이 저장되어 있습니다.");
        }

        Preset newPreset = Preset.builder()
                .userId(userId)
                .productId(productId)
                .presetName(presetName)
                .build();

        presetMapper.createPreset(newPreset);
    }

    public List<Preset> getUserPresets(int userId) {
        return presetMapper.findByUserId(userId);
    }

    @Transactional
    public void deletePreset(int userId, int presetId) {

        // 1. 🔥 커뮤니티 게시글(post_tb)부터 먼저 삭제 (순서 중요!)
        // 외래키 관계 때문에 자식(post_tb)을 먼저 지워야 부모(preset_tb)를 지울 수 있습니다.
        postMapper.deleteByPresetId(presetId);

        // 2. 실제 프리셋 삭제

        int deletedCount = presetMapper.deleteById(userId, presetId);

        if (deletedCount == 0) {
            throw new RuntimeException("삭제할 프리셋이 없거나 삭제 권한이 없습니다.");
        }
    }

}
