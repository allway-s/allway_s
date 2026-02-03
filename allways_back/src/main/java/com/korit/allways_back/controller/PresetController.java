package com.korit.allways_back.controller;

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

    @GetMapping
    public ResponseEntity<List<Preset>> getUserPresets() { // @RequestParam 삭제!
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        List<Preset> presets = presetService.getUserPresets(principalUser.getUser().getUserId());
        return ResponseEntity.ok(presets);
    }

    @DeleteMapping("/{presetId}")
    public ResponseEntity<Void> deletePreset(@PathVariable Integer presetId) { // userId 파라미터 삭제
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        presetService.deletePreset(presetId, principalUser.getUser().getUserId());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getUserPresetCount() { // @RequestParam 삭제
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) return ResponseEntity.status(401).build();

        int count = presetService.getUserPresetCount(principalUser.getUser().getUserId());
        return ResponseEntity.ok(count);
    }
}