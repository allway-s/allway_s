    package com.korit.allways_back.controller;
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

        @GetMapping
        public ResponseEntity<List<Post>> getAllPosts() {
            PrincipalUser principalUser = PrincipalUser.get();
            Integer userId = (principalUser != null) ? principalUser.getUser().getUserId() : null;

            List<Post> posts = postService.getAllPosts(userId);
            return ResponseEntity.ok(posts);
        }

        @PostMapping("/{postId}/like")
        public ResponseEntity<Map<String, Boolean>> toggleLike(@PathVariable Integer postId) {
            PrincipalUser principalUser = PrincipalUser.get();
            if (principalUser == null) return ResponseEntity.status(401).build();

            boolean liked = postService.toggleLike(principalUser.getUser().getUserId(), postId);

            Map<String, Boolean> response = new HashMap<>();
            response.put("liked", liked);
            return ResponseEntity.ok(response);
        }
    }