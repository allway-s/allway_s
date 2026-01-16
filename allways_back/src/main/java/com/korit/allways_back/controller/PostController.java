package com.korit.allways_back.controller;

import com.korit.allways_back.entity.Post;
import com.korit.allways_back.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/post")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Map<String, Integer> request) {

        int presetId = request.get("presetId");

        Post newPost = postService.createNewPost(presetId);

        return ResponseEntity.ok(newPost);
    }

}
