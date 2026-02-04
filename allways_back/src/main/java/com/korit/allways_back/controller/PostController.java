package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    /**
     * 게시글 생성
     * POST /api/posts
     */
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostCreateRequestDto dto) {
        // ✅ 토큰에서 userId 추출
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        if (dto.getPresetId() == null) {
            return ResponseEntity.badRequest().body("presetId는 필수입니다.");
        }

        try {
            // ✅ 토큰의 userId 사용
            Post createdPost = postService.createPost(
                    principalUser.getUser().getUserId(),
                    dto
            );
            return ResponseEntity.ok(createdPost);
        } catch (IllegalStateException e) {
            // 중복 게시글 에러
            return ResponseEntity.status(409).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 전체 게시글 조회
     * GET /api/posts
     */
    @GetMapping
    public ResponseEntity<?> getAllPosts() {
        // ✅ 로그인한 사용자만 조회 가능
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        List<Post> posts = postService.getAllPosts(principalUser.getUser().getUserId());
        return ResponseEntity.ok(posts);
    }

    /**
     * 좋아요 토글
     * POST /api/posts/{postId}/like
     */
    @PostMapping("/{postId}/like")
    public ResponseEntity<?> toggleLike(@PathVariable Integer postId) {
        // ✅ 토큰에서 userId 추출
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            boolean liked = postService.toggleLike(principalUser.getUser().getUserId(), postId);
            Map<String, Boolean> response = new HashMap<>();
            response.put("liked", liked);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * 게시글 삭제
     * DELETE /api/posts/{postId}
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Integer postId) {
        // ✅ 토큰에서 userId 추출
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }

        try {
            postService.deletePost(postId, principalUser.getUser().getUserId());
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}