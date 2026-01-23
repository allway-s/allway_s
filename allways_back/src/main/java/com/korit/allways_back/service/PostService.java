package com.korit.allways_back.service;

import com.korit.allways_back.entity.Post;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.mapper.PostMapper;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;
    private final PresetMapper presetMapper;

    public Post createNewPost(int presetId) {
        Post post = Post.builder()
                .presetId(presetId)
                .likeCnt(0)
                .build();

        postMapper.createPost(post);

        return post;
    }

    @Transactional
    public void likePost(int userId, int postId) {
        if (postMapper.checkLikeExists(userId, postId) > 0) {
            postMapper.deleteLikeLog(userId, postId);
            postMapper.decrementLikeCount(postId);
        } else {
            postMapper.insertLikeLog(userId, postId);
            postMapper.incrementLikeCount(postId);
        }
    }

    // 게시글 리스트 불러오기
    public List<Post> getPosts() {
        return postMapper.getAllPosts();
    }
}
