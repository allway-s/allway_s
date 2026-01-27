package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PresetReqDto;
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

    private final PresetMapper presetMapper; // 프리셋 DB 접근을 위한 매퍼
    private final PostMapper postMapper; // 프리셋 삭제 시 관련 게시글 처리를 위한 매퍼

    @Transactional
    public void savePreset(int userId, PresetReqDto presetReqDto) {
        // 1. 사용자의 현재 프리셋 개수를 조회하여 10개가 넘는지 확인합니다.
        int currentCount = presetMapper.countByUserId(userId);
        if (currentCount >= 10) {
            throw new RuntimeException("프리셋은 최대 10개까지만 저장할 수 있습니다.");
        }

        // 2. 이미 같은 상품(Product)이 프리셋으로 등록되어 있는지 체크합니다.
        if (presetMapper.existsByUserIdAndProductId(userId, presetReqDto.getProductId())) {
            throw new RuntimeException("이미 저장된 조합입니다.");
        }

        // 3. DTO 데이터를 바탕으로 Preset 엔티티 객체를 생성합니다.
        Preset preset = Preset.builder()
                .userId(userId) // 저장하는 사용자 ID
                .productId(presetReqDto.getProductId()) // 연결된 커스텀 상품 ID
                .presetName(presetReqDto.getPresetName()) // 사용자가 설정한 이름
                .setId(presetReqDto.getSetId()) // 선택한 세트 메뉴 정보
                .selectedDrinkId(presetReqDto.getSelectedDrinkId()) // 선택한 음료
                .selectedSideId(presetReqDto.getSelectedSideId()) // 선택한 사이드
                .isOriginal(true) // 직접 만든 것이므로 true
                .build();

        // 4. DB에 프리셋 정보를 저장합니다.
        presetMapper.insert(preset);
    }

    @Transactional
    public void deletePreset(int userId, int presetId) {
        // 1. 해당 프리셋을 삭제합니다. (본인 것만 삭제 가능하도록 userId 체크 포함)
        int deletedRows = presetMapper.deleteById(userId, presetId);

        // 2. 삭제된 행이 있다면, 해당 프리셋으로 작성된 게시글도 함께 숨기거나 삭제합니다.
        if (deletedRows > 0) {
            postMapper.deleteByPresetId(presetId);
        }
    }
}