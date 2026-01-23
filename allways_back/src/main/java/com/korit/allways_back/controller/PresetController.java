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

    @PostMapping("/scrap")
    public ResponseEntity<?> scrapPreset(@RequestBody PresetReqDto presetReqDto) {
        presetService.scrapPreset(
                presetReqDto.getUserId(),
                presetReqDto.getProductId(),
                presetReqDto.getPresetName()
        );

        return ResponseEntity.status(201).body("프리셋이 저장되었습니다.");
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<Preset>> getMyPresets(@PathVariable int userId) {
        return ResponseEntity.ok(presetService.getUserPresets(userId));
    }

    @DeleteMapping("/delete/{presetId}")
    public ResponseEntity<?> deletePreset(
            @PathVariable int presetId,
            @RequestParam int userId
    ) {
        presetService.deletePreset(userId, presetId);

        return ResponseEntity.ok().body("프리셋이 성공적으로 삭제되었습니다.");
    }


}