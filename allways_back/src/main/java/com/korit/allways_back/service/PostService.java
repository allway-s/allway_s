package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.mapper.PostMapper;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;
    private final PresetMapper presetMapper;

    /**
     * 게시글 생성
     */
    @Transactional
    public Post createPost(int userId, PostCreateRequestDto dto) {

        Integer presetId = dto.getPresetId();

        // 3️⃣ 중복 게시글 체크 (preset 기준)
        if (postMapper.existsByPresetId(presetId)) {
            throw new IllegalStateException("이미 게시된 프리셋입니다.");
        }

        // 4️⃣ 게시글 생성
        Post post = Post.builder()
                .presetId(presetId)
                .userId(userId)
                .postedAt(LocalDateTime.now())
                .likeCount(0)
                .build();

        postMapper.insert(post);
        return post;
    }

    /**
     * 게시글 전체 조회
     */
    public List<Post> getAllPosts(Integer userId) {
        return postMapper.findAll(userId);
    }

    /**
     * 좋아요 토글
     */
    @Transactional
    public boolean toggleLike(Integer userId, Integer postId) {

        int inserted = postMapper.insertLike(userId, postId);

        boolean liked;
        if (inserted > 0) {
            liked = true;
        } else {
            postMapper.deleteLike(userId, postId);
            liked = false;
        }

        postMapper.updateLikeCount(postId);
        return liked;
    }

    /**
     * 게시글 삭제 (작성자만)
     */
    @Transactional
    public void deletePost(Integer postId, Integer userId) {
        // userId를 받아서 본인 게시글만 삭제
        int deleted = postMapper.deleteById(postId, userId);
        if (deleted == 0) {
            throw new IllegalArgumentException(
                    "삭제할 수 없습니다. 게시글이 존재하지 않거나 권한이 없습니다."
            );
        }
    }
}