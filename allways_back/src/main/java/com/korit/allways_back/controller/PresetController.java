package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PresetRequestDto;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.PresetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/presets")
@RequiredArgsConstructor
public class PresetController {

    private final PresetService presetService;

    /**
     * 프리셋 저장
     * - 주문 내역에서 "내 프리셋에 저장" 버튼 클릭 시 호출
     * - 보안: 토큰의 userId를 사용 (클라이언트에서 받은 userId 무시)
     */
    @PostMapping("/save")
    public ResponseEntity<?> savePreset(@RequestBody PresetRequestDto dto) {
        // ✅ 보안: 토큰에서 userId 추출
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        // ✅ 토큰의 userId 사용 (클라이언트에서 보낸 userId는 무시)
        Preset preset = Preset.builder()
                .productId(dto.getProductId())
                .userId(principalUser.getUser().getUserId())  // 토큰에서 추출
                .presetName(dto.getPresetName())
                .postedUserId(principalUser.getUser().getUserId())
                .build();

        try {
            presetService.savePreset(preset);
            return ResponseEntity.ok().build();
        } catch (IllegalStateException | IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 내 프리셋 목록 조회
     */
    @GetMapping
    public ResponseEntity<List<Preset>> getUserPresets() {
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        List<Preset> presets = presetService.getUserPresets(principalUser.getUser().getUserId());
        return ResponseEntity.ok(presets);
    }

    /**
     * 프리셋 삭제
     */
    @DeleteMapping("/{presetId}")
    public ResponseEntity<Void> deletePreset(@PathVariable Integer presetId) {
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        try {
            presetService.deletePreset(presetId, principalUser.getUser().getUserId());
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * 내 프리셋 개수 조회
     */
    @GetMapping("/count")
    public ResponseEntity<Integer> getUserPresetCount() {
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        int count = presetService.getUserPresetCount(principalUser.getUser().getUserId());
        return ResponseEntity.ok(count);
    }
}