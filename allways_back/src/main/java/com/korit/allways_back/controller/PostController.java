package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
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
    public ResponseEntity<?> createPost(
            @RequestBody PostCreateRequestDto dto
    ) {
        if (dto.getUserId() == null) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }
        if (dto.getPresetId() == null) {
            throw new IllegalArgumentException("presetId는 필수입니다.");
        }

        Post createdPost = postService.createPost(dto.getUserId(), dto);
        return ResponseEntity.ok(createdPost);
    }

    /**
     * 전체 게시글 조회
     * GET /api/posts?userId=1
     */
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(
            @RequestParam(required = false) Integer userId) {
        List<Post> posts = postService.getAllPosts(userId);
        return ResponseEntity.ok(posts);
    }

    /**
     * 좋아요 토글
     * POST /api/posts/{postId}/like
     */
    @PostMapping("/{postId}/like")
    public ResponseEntity<Map<String, Boolean>> toggleLike(
            @PathVariable Integer postId,
            @RequestBody Map<String, Integer> request) {
        Integer userId = request.get("userId");
        if (userId == null) {
            throw new IllegalArgumentException("userId는 필수입니다.");
        }

        boolean liked = postService.toggleLike(userId, postId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("liked", liked);
        return ResponseEntity.ok(response);
    }

    /**
     * 게시글 삭제
     * DELETE /api/posts/{postId}?userId=1
     */
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(
            @PathVariable Integer postId,
            @RequestParam Integer userId) {
        postService.deletePost(postId, userId);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleIllegalState(IllegalStateException e) {
        Map<String, String> response = new HashMap<>();
        response.put("message", e.getMessage());
        return ResponseEntity.ok(response); // ⭐ 200으로 내려보냄
    }
}