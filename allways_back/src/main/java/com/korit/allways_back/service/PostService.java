package com.korit.allways_back.service;

import com.korit.allways_back.entity.Post;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.mapper.PostMapper;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.w3c.dom.stylesheets.LinkStyle;

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
        // 1. 이미 좋아요를 눌렀는지 확인
        if (postMapper.checkLikeExists(userId, postId) > 0) {
            // 2. 이미 있다면 취소 (로그 삭제 + 카운트 감소)
            postMapper.deleteLikeLog(userId, postId);
            postMapper.decrementLikeCount(postId);
        } else {
            // 3. 없다면 좋아요 (로그 추가 + 카운트 증가)
            postMapper.insertLikeLog(userId, postId);
            postMapper.incrementLikeCount(postId);
        }
    }

    // 게시글 리스트 불러오기
    public List<Post> getPosts() {
        return postMapper.getAllPosts();
    }
}
