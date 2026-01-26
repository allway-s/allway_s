package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PostReqDto;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final PostService postService; // 게시글 서비스

    @PostMapping("/post") // 프리셋을 게시판에 공유
    public ResponseEntity<?> createPost(@RequestBody PostReqDto postReqDto) {
        // DTO에 담긴 프리셋 ID를 기반으로 커뮤니티 게시글 생성
        postService.createPost(postReqDto);
        return ResponseEntity.ok("게시글이 등록되었습니다.");
    }

    @GetMapping("/posts") // 전체 게시글 조회
    public ResponseEntity<?> getPosts(@RequestParam(defaultValue = "latest") String sortBy,
                                      @AuthenticationPrincipal PrincipalUser principalUser) {
        // 1. 로그인 여부에 따라 좋아요 상태를 표시하기 위해 사용자 ID 추출 (비로그인 시 null)
        Integer userId = (principalUser != null) ? principalUser.getUser().getUserId() : null;
        // 2. 정렬 기준(최신순/인기순)에 따라 게시글 목록 반환
        return ResponseEntity.ok(postService.getAllPosts(sortBy, userId));
    }

    @PostMapping("/post/{postId}/like") // 좋아요 토글
    public ResponseEntity<?> toggleLike(@AuthenticationPrincipal PrincipalUser principalUser,
                                        @PathVariable int postId) {
        // 로그인한 사용자가 해당 게시글에 대해 좋아요/취소를 수행함
        postService.toggleLike(principalUser.getUser().getUserId(), postId);
        return ResponseEntity.ok().build();
    }
}
