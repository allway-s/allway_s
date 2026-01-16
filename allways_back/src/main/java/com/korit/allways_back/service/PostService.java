package com.korit.allways_back.service;

import com.korit.allways_back.entity.Post;
import com.korit.allways_back.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    public Post createNewPost(int presetId) {
        Post post = Post.builder()
                .presetId(presetId)
                .likeCnt(0)
                .build();

        postMapper.createPost(post);

        return post;
    }

}
