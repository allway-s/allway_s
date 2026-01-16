package com.korit.allways_back.service;

import com.korit.allways_back.dto.response.PresetRespDto;
import com.korit.allways_back.entity.Preset;
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

        Preset newPreset = Preset.builder()
                .userId(userId)
                .productId(productId)
                .presetName(presetName)
                .build();

        presetMapper.createPreset(newPreset);
    }

}
