package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    void createPost(Post post);

    int incrementLikeCount(int postId);

    int insertLikeLog(@Param("userId") int userId, @Param("postId") int postId);

    // 좋아요 여부 확인 (있으면 1, 없으면 0)
    int checkLikeExists(@Param("userId") int userId, @Param("postId") int postId);

    // 좋아요 로그 삭제
    int deleteLikeLog(@Param("userId") int userId, @Param("postId") int postId);

    // 좋아요 카운트 감소
    int decrementLikeCount(int postId);

    // 전체 게시글 목록 조회
    List<Post> getAllPosts();


    // 🔥 추가: 프리셋 ID로 게시글 삭제하기
    int deleteByPresetId(int presetId);
}
