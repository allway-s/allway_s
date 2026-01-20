package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PostLikeReqDto;
import com.korit.allways_back.dto.request.PostReqDto;
import com.korit.allways_back.dto.request.PresetScrapReqDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.service.PostService;
import com.korit.allways_back.service.PresetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final PresetService presetService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody PostReqDto dto) {

        int presetId = dto.getPresetId();

        Post newPost = postService.createNewPost(presetId);

        return ResponseEntity.ok(newPost);
    }

    @PostMapping("/{postId}/like")
    public ResponseEntity<?> likePost(@PathVariable int postId, @RequestBody PostLikeReqDto dto) {
        int userId = dto.getUserId();
        postService.likePost(userId, postId);
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/scrap")
//    public ResponseEntity<?> scrapPreset(@RequestBody PresetScrapReqDto dto) {
//        int userId = dto.getUserId();
//        int productId = dto.getProductId();
//        String presetName = dto.getPresetName();
//
//        presetService.scrapPreset(userId, productId, presetName);
//        return ResponseEntity.ok().build();
//    }

    @GetMapping("/getAllPost")
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getPosts());
    }

}
