package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PresetReqDto;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.service.PresetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/preset")
@RequiredArgsConstructor
public class PresetController {

    private final PresetService presetService;

    @GetMapping("/details/{productId}")
    public ResponseEntity<Map<Integer, List<Integer>>> getPresetDetails(@PathVariable int productId) {
        Map<Integer, List<Integer>> details = presetService.getPresetMap(productId);

        return ResponseEntity.ok(details);
    }

    // 프리셋 저장 API 추가
    @PostMapping("/scrap")
    public ResponseEntity<?> scrapPreset(@RequestBody PresetReqDto presetReqDto) {
        // 서비스의 scrapPreset을 호출하여 DB에 insert를 수행합니다.
        presetService.scrapPreset(
                presetReqDto.getUserId(),
                presetReqDto.getProductId(),
                presetReqDto.getPresetName()
        );

        // 성공적으로 생성되었다는 201 Created 응답을 보냅니다.
        return ResponseEntity.status(201).body("프리셋이 저장되었습니다.");
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<Preset>> getMyPresets(@PathVariable int userId) {
        // 사용자가 저장했던 프리셋(이름, 날짜, 연결된 상품ID 등) 목록을 반환합니다.
        return ResponseEntity.ok(presetService.getUserPresets(userId));
    }


}