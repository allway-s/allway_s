package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PresetReqDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.service.PostService;
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
    private final PostService postService;

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


    // 🔥 공유 버튼 클릭 시 호출되는 메서드
    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Map<String, Integer> request) {
        // 프론트에서 { "presetId": 123 } 형태로 보냄
        int presetId = request.get("presetId");

        // PostService에서 중복 체크 후 게시글 생성
        Post post = postService.createNewPost(presetId);

        return ResponseEntity.ok().body("커뮤니티에 성공적으로 공유되었습니다.");
    }


}