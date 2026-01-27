package com.korit.allways_back.mapper;

import com.korit.allways_back.dto.request.PostCreateRequestDto;
import com.korit.allways_back.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PostMapper {

    int insert(Post post);

    List<Post> findAll(
            @Param("currentUserId") Integer currentUserId
    );

    int insertLike(
            @Param("userId") Integer userId,
            @Param("postId") Integer postId
    );

    int deleteLike(
            @Param("userId") Integer userId,
            @Param("postId") Integer postId
    );

    int updateLikeCount(@Param("postId") Integer postId);

    int deleteByPresetId(@Param("presetId") Integer presetId);

    boolean existsByUserIdAndProductId(
            @Param("userId") Integer userId,
            @Param("productId") Integer productId
    );
}