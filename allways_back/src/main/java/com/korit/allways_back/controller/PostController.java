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
     * 작동 방식: 토큰에서 추출한 userId와 RequestBody의 프리셋 정보를 사용하여 게시글을 생성합니다.
     */
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody PostCreateRequestDto dto) {
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).build(); // 인증되지 않은 경우
        }

        int userId = principalUser.getUser().getUserId();
        Post createdPost = postService.createPost(userId, dto);
        return ResponseEntity.ok(createdPost);
    }

    /**
     * 전체 게시글 조회
     * GET /api/posts
     * 작동 방식: 로그인 상태라면 해당 유저의 '좋아요 여부'를 포함하여 조회하고, 비로그인 시 게시글 목록만 조회합니다.
     */
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        PrincipalUser principalUser = PrincipalUser.get();
        // 로그인 안 한 상태에서도 게시글은 볼 수 있어야 하므로 null 허용
        Integer userId = (principalUser != null) ? principalUser.getUser().getUserId() : null;

        List<Post> posts = postService.getAllPosts(userId);
        return ResponseEntity.ok(posts);
    }

    /**
     * 좋아요 토글
     * POST /api/posts/{postId}/like
     * 작동 방식: 사용자가 해당 게시글을 이미 좋아했다면 취소, 아니면 추가를 수행합니다.
     */
    @PostMapping("/{postId}/like")
    public ResponseEntity<Map<String, Boolean>> toggleLike(@PathVariable Integer postId) {
        PrincipalUser principalUser = PrincipalUser.get();
        if (principalUser == null) {
            return ResponseEntity.status(401).build();
        }

        boolean liked = postService.toggleLike(principalUser.getUser().getUserId(), postId);

        Map<String, Boolean> response = new HashMap<>();
        response.put("liked", liked);
        return ResponseEntity.ok(response);
    }

    /**
     * 프리셋 ID를 통한 게시글 삭제
     * DELETE /api/posts/preset/{presetId}
     * 작동 방식: 프리셋이 삭제될 때 해당 프리셋으로 작성된 커뮤니티 게시글도 함께 삭제합니다.
     */
    @DeleteMapping("/preset/{presetId}")
    public ResponseEntity<Void> deleteByPresetId(@PathVariable Integer presetId) {
        // 본인 확인 로직이 필요하다면 여기에 PrincipalUser 체크를 추가할 수 있습니다.
        postService.deleteByPresetId(presetId);
        return ResponseEntity.noContent().build();
    }
}