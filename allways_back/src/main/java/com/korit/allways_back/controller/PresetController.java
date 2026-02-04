package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PresetRequestDto;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.PresetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/presets")
@RequiredArgsConstructor
public class PresetController {

    private final PresetService presetService;

    /**
     * 포스트를 내 프리셋으로 저장
     */
    @PostMapping("/posts")
    public ResponseEntity<?> savePresetFromPost(
            @RequestBody PresetRequestDto dto
    ) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }
        if (dto.getPostId() == null) {
            throw new IllegalArgumentException("postId는 필수입니다.");
        }

        presetService.savePresetFromPost(
                dto.getUserId(),
                dto.getPostId()
        );

        return ResponseEntity.ok().build();
    }

    /**
     * 내 프리셋 목록 조회
     * GET /api/presets?userId=1
     */
    @GetMapping
    public ResponseEntity<List<Preset>> findByUserId(
            @RequestParam Integer userId) {
        List<Preset> presets = presetService.findByUserId(userId);
        return ResponseEntity.ok(presets);
    }

    /**
     * 프리셋 삭제
     * DELETE /api/presets/{presetId}?userId=1
     */
    @DeleteMapping("/{presetId}")
    public ResponseEntity<Void> deleteById(
            @PathVariable Integer presetId,
            @RequestParam Integer userId) {
        presetService.deleteById(presetId, userId);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleIllegalState(IllegalStateException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return ResponseEntity.status(409).body(response); // ❗ 200 ❌
    }
}