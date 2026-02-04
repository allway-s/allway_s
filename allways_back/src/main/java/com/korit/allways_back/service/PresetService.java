package com.korit.allways_back.service;

import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.mapper.PostMapper;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PresetService {

    private final PresetMapper presetMapper;
    private final PostMapper postMapper;

    private static final int MAX_PRESETS_PER_USER = 10;

    @Transactional
    public Preset savePreset(Preset preset) {
        int currentCount = presetMapper.countByUserId(preset.getUserId());
        if (currentCount >= MAX_PRESETS_PER_USER) {
            throw new IllegalStateException("프리셋은 최대 " + MAX_PRESETS_PER_USER + "개까지 저장할 수 있습니다.");
        }

        if (preset.getPostedUserId() != null &&
                presetMapper.existsByUserIdProductIdAndPostedUserId(
                        preset.getUserId(),
                        preset.getProductId(),
                        preset.getPostedUserId())) {
            throw new IllegalArgumentException("이미 저장한 프리셋입니다.");
        }

        presetMapper.insert(preset);
        return preset;
    }

    public List<Preset> getUserPresets(Integer userId) {
        return presetMapper.findByUserId(userId);
    }

    public Preset getPresetById(Integer presetId) {
        Preset preset = presetMapper.findById(presetId);
        if (preset == null) {
            throw new IllegalArgumentException("존재하지 않는 프리셋입니다.");
        }
        return preset;
    }

    /**
     * ✅ Soft Delete로 변경
     */
    @Transactional
    public void deletePreset(Integer presetId, Integer userId) {
        // 1️⃣ 프리셋 조회
        Preset preset = presetMapper.findById(presetId);
        if (preset == null) {
            throw new IllegalArgumentException("존재하지 않는 프리셋입니다.");
        }

        if (!preset.getUserId().equals(userId)) {
            throw new IllegalArgumentException("삭제 권한이 없습니다.");
        }

        // 2️⃣ 오리지널 레시피면 게시글도 삭제
        if (preset.getPostedUserId() != null && preset.getPostedUserId().equals(userId)) {
            postMapper.deleteByPresetId(presetId);
        }

        // 3️⃣ Soft Delete (is_deleted = 1)
        int deleted = presetMapper.deleteById(presetId, userId);
        if (deleted == 0) {
            throw new IllegalArgumentException("삭제할 수 없습니다.");
        }
    }

    public int getUserPresetCount(Integer userId) {
        return presetMapper.countByUserId(userId);
    }
}