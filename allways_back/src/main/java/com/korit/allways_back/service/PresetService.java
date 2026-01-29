package com.korit.allways_back.service;

import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PresetService {

    private final PresetMapper presetMapper;

    private static final int MAX_PRESETS_PER_USER = 10; // 사용자당 최대 프리셋 수

    /**
     * 프리셋 저장
     */
    @Transactional
    public Preset savePreset(Preset preset) {
        // 최대 개수 체크
        int currentCount = presetMapper.countByUserId(preset.getUserId());
        if (currentCount >= MAX_PRESETS_PER_USER) {
            throw new IllegalStateException("프리셋은 최대 " + MAX_PRESETS_PER_USER + "개까지 저장할 수 있습니다.");
        }

        // 중복 체크 (같은 상품 프리셋 존재 여부)
        if (presetMapper.existsByUserIdAndProductId(preset.getUserId(), preset.getProductId())) {
            throw new IllegalArgumentException("이미 동일한 상품의 프리셋이 존재합니다.");
        }

        presetMapper.insert(preset);
        return preset;
    }

    /**
     * 사용자 ID로 프리셋 목록 조회
     */
    public List<Preset> getUserPresets(Integer userId) {
        return presetMapper.findByUserId(userId);
    }

    /**
     * 프리셋 ID로 조회
     */
    public Preset getPresetById(Integer presetId) {
        Preset preset = presetMapper.findById(presetId);
        if (preset == null) {
            throw new IllegalArgumentException("존재하지 않는 프리셋입니다.");
        }
        return preset;
    }

    /**
     * 프리셋 삭제
     */
    @Transactional
    public void deletePreset(Integer presetId, Integer userId) {
        int deleted = presetMapper.deleteById(presetId, userId);
        if (deleted == 0) {
            throw new IllegalArgumentException("삭제할 수 없습니다. 프리셋이 존재하지 않거나 권한이 없습니다.");
        }
    }

    /**
     * 사용자의 프리셋 개수 조회
     */
    public int getUserPresetCount(Integer userId) {
        return presetMapper.countByUserId(userId);
    }
}