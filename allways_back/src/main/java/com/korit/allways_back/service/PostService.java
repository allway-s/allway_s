package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
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
    public Post createPost(int userId, PostCreateRequestDto dto) {

        // 1️⃣ preset → productId 조회
        int productId =
                presetMapper.findProductIdByPresetId(dto.getPresetId());

        // 2️⃣ 중복 게시 검사 (userId + productId)
        boolean exists =
                postMapper.existsPostByUserIdAndProductId(userId, productId);

        if (exists) {
            throw new IllegalArgumentException("이미 동일한 상품으로 게시한 글이 있습니다.");
        }

        // 3️⃣ post 생성
        Post post = Post.builder()
                .userId(userId)
                .presetId(dto.getPresetId())
                .postedAt(java.time.LocalDateTime.now())
                .likeCount(0)
                .build();

        postMapper.insert(post);

        return post;
    }

    public List<Post> getAllPosts(Integer userId) {
        return postMapper.findAll(userId);
    }

    /**
     * 좋아요 토글 (좋아요 추가/삭제)
     * @return true: 좋아요 추가, false: 좋아요 취소
     */
    @Transactional
    public boolean toggleLike(Integer userId, Integer postId) {
        // 좋아요 추가 시도
        int inserted = postMapper.insertLike(userId, postId);

        boolean liked;
        if (inserted > 0) {
            // 좋아요 추가 성공
            liked = true;
        } else {
            // 이미 좋아요가 있음 → 삭제
            postMapper.deleteLike(userId, postId);
            liked = false;
        }

        // 좋아요 수 업데이트
        postMapper.updateLikeCount(postId);

        return liked;
    }

    /**
     * 프리셋 ID로 게시글 삭제 (프리셋 삭제 시 호출)
     */
    @Transactional
    public void deleteByPostId(Integer postId) {
        postMapper.deleteByPostId(postId);
    }

}