package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.PostReqDto;
import com.korit.allways_back.entity.Post;
import com.korit.allways_back.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper; // 게시글 및 좋아요 DB 접근

    @Transactional
    public void createPost(PostReqDto postReqDto) {
        // 1. 전달받은 프리셋 ID를 기반으로 게시글 객체를 생성합니다.
        Post post = Post.builder()
                .presetId(postReqDto.getPostId()) // 게시할 프리셋 ID
                .build();

        // 2. 게시글 정보를 저장합니다. (초기 좋아요/조회수는 XML에서 0으로 설정됨)
        postMapper.insert(post);
    }

    public List<Post> getAllPosts(String sortBy, Integer currentUserId) {
        // 1. 정렬 기준(latest 또는 like)에 따라 전체 게시글 목록을 가져옵니다.
        // 2. 로그인한 사용자가 있다면 각 게시글에 '좋아요'를 눌렀는지 여부도 함께 조회합니다.
        return postMapper.findAll(sortBy, currentUserId);
    }

    @Transactional
    public void toggleLike(int userId, int postId) {
        // 1. 먼저 좋아요를 취소(삭제)해봅니다.
        int result = postMapper.deleteLike(userId, postId);

        // 2. 삭제된 행이 0개라면 기존에 좋아요가 없었다는 뜻이므로, 새로 추가합니다.
        if (result == 0) {
            postMapper.insertLike(userId, postId);
        }

        // 3. 좋아요 테이블의 변화를 post_tb의 like_count 컬럼에 동기화합니다.
        postMapper.updateLikeCount(postId);
    }
}