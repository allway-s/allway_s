package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {
    // 게시글 생성 (XML id: insert)
    void insert(Post post);

    // 전체 게시글 조회 (XML id: findAll)
    List<Post> findAll(@Param("sortBy") String sortBy, @Param("currentUserId") Integer currentUserId);

    // 좋아요 추가 (XML id: insertLike)
    int insertLike(@Param("userId") int userId, @Param("postId") int postId);

    // 좋아요 취소 (XML id: deleteLike)
    int deleteLike(@Param("userId") int userId, @Param("postId") int postId);

    // 좋아요 수 동기화 (XML id: updateLikeCount)
    int updateLikeCount(int postId);

    // 프리셋 삭제 시 게시글 삭제 (XML id: deleteByPresetId)
    int deleteByPresetId(int presetId);
}