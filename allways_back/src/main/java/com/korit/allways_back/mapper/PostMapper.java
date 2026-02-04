package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    /** 게시글 생성 */
    int insert(Post post);

    /** 게시글 전체 조회 */
    List<Post> findAll(@Param("userId") Integer userId);

    /** preset 기준 중복 게시글 체크 */
    boolean existsByPresetId(@Param("presetId") Integer presetId);

    /** ✅ 사용자+프리셋 기준 중복 체크 */
    boolean existsByUserIdAndPresetId(@Param("userId") Integer userId,
                                      @Param("presetId") Integer presetId);

    /** 좋아요 추가 */
    int insertLike(@Param("userId") Integer userId,
                   @Param("postId") Integer postId);

    /** 좋아요 삭제 */
    int deleteLike(@Param("userId") Integer userId,
                   @Param("postId") Integer postId);

    /** 좋아요 수 갱신 */
    int updateLikeCount(@Param("postId") Integer postId);

    /** 게시글 삭제 (작성자만) */
    int deleteById(@Param("postId") Integer postId,
                   @Param("userId") Integer userId);

    /** ✅ 프리셋 기준 게시글 삭제 (Cascade용) */
    int deleteByPresetId(@Param("presetId") Integer presetId);

    /** 게시글 작성자 조회 (프리셋 저장용) */
    Integer findPostedUserIdByPostId(@Param("postId") Integer postId);
}