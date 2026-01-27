package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.LikeRequestDto;
import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping
    public ResponseEntity<Post> createPost(@AuthenticationPrincipal PrincipalUser principalUser,
            @RequestBody PostCreateRequestDto dto) {
        int userId = principalUser.getUser().getUserId();
        Post createdPost = postService.createPost(userId, dto);
        return ResponseEntity.ok(createdPost);
    }

    /**
     * 전체 게시글 조회
     * GET /api/posts?sortBy=like&userId=1
     * sortBy: "like" (좋아요순) 또는 null (최신순)
     * userId: 현재 로그인한 사용자 ID (좋아요 여부 확인용, 선택)
     */
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts(
            @RequestParam(required = false) Integer userId
    ) {
        List<Post> posts = postService.getAllPosts(userId);
        return ResponseEntity.ok(posts);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Map<String, Boolean>> toggleLike(
            @PathVariable Integer postId,
            @RequestBody LikeRequestDto dto) {
        boolean liked = postService.toggleLike(dto.getUserId(), postId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("liked", liked);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/preset/{presetId}")
    public ResponseEntity<Void> deleteByPresetId(@PathVariable Integer presetId) {
        postService.deleteByPresetId(presetId);
        return ResponseEntity.noContent().build();
    }
}