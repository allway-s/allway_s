package com.korit.allways_back.controller;

import com.korit.allways_back.service.PresetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}