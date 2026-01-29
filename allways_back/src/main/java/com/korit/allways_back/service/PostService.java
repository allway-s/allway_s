package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    @Transactional
    public Post createPost(int userId, PostCreateRequestDto dto) {

        Post post = Post.builder()
                .userId(userId)
                .presetId(dto.getPresetId())
                .postedAt(java.time.LocalDateTime.now())
                .likeCount(0)
                .build();

        postMapper.insert(post);

        return post;
    }

    public List<Post> getAllPosts(Integer currentUserId) {
        return postMapper.findAll(currentUserId);
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
    public void deleteByPresetId(Integer presetId) {
        postMapper.deleteByPresetId(presetId);
    }

}