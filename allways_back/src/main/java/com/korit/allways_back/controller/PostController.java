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

        @DeleteMapping("/{postId}")
        public ResponseEntity<Void> deleteByPostId(@PathVariable Integer postId) {
            postService.deleteByPostId(postId);
            return ResponseEntity.noContent().build();
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