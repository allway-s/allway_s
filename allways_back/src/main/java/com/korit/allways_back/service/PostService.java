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

    @Transactional
    public Post createNewPost(int presetId) {
        // 1. 프리셋 정보 조회 (userId와 productId를 알기 위함)
        Preset preset = presetMapper.findById(presetId);

        if (preset == null) {
            throw new RuntimeException("존재하지 않는 프리셋입니다.");
        }

        // 2. 진현님의 기획: 동일 유저 & 동일 상품 구성 중복 체크
        int alreadyPosted = postMapper.checkAlreadyPosted(preset.getUserId(), preset.getProductId());

        if (alreadyPosted > 0) {
            // 이미 공유된 경우 여기서 멈추고 에러를 던짐
            throw new RuntimeException("이미 동일한 상품 구성의 레시피를 공유하셨습니다.");
        }

        // 3. 중복이 아닐 때만 게시글 생성
        Post post = Post.builder()
                .presetId(presetId)
                .likeCnt(0)
                .build();

        postMapper.createPost(post);

        return post;
    } // createNewPost 메소드 끝

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

    public List<Post> getPosts() {
        return postMapper.getAllPosts();
    }
}
