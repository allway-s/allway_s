package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.dto.request.PresetRequestDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.PresetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/presets")
@RequiredArgsConstructor
public class PresetController {

    private final PresetService presetService;

    /**
     * 프리셋 저장
     * POST /api/presets
     *
     * Request Body:
     * {
     *   "userId": 1,
     *   "productId": 10,
     *   "presetName": "내가 좋아하는 피자"
     * }
     */
    @PostMapping
    public ResponseEntity<Preset> savePreset(@RequestBody Preset preset) {
        Preset savedPreset = presetService.savePreset(preset);
        return ResponseEntity.ok(savedPreset);
    }

    @PostMapping("/post")
    public ResponseEntity<Preset> savePresetFromPost(
            @RequestBody PresetRequestDto dto) {

        Preset savedPresetFromPost = presetService.savePresetFromPost(dto.getUserId(), dto.getPostId());
        return ResponseEntity.ok(savedPresetFromPost);
    }

    /**
     * 사용자의 프리셋 목록 조회
     * GET /api/presets?userId=1
     */
    @GetMapping
    public ResponseEntity<List<Preset>> getUserPresets(@RequestParam Integer userId) {
        List<Preset> presets = presetService.getUserPresets(userId);
        return ResponseEntity.ok(presets);
    }

    /**
     * 프리셋 조회 (by ID)
     * GET /api/presets/1
     */
    @GetMapping("/{presetId}")
    public ResponseEntity<Preset> getPresetById(@PathVariable Integer presetId) {
        Preset preset = presetService.getPresetById(presetId);
        return ResponseEntity.ok(preset);
    }

    /**
     * 프리셋 삭제
     * DELETE /api/presets/1?userId=1
     */
    @DeleteMapping("/{presetId}")
    public ResponseEntity<Void> deletePreset(
            @PathVariable Integer presetId,
            @RequestParam Integer userId
    ) {
        presetService.deletePreset(presetId, userId);
        return ResponseEntity.noContent().build();
    }

    /**
     * 사용자의 프리셋 개수 조회
     * GET /api/presets/count?userId=1
     */
    @GetMapping("/count")
    public ResponseEntity<Integer> getUserPresetCount(@RequestParam Integer userId) {
        int count = presetService.getUserPresetCount(userId);
        return ResponseEntity.ok(count);
    }
}