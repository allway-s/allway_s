package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PostMapper {

    void createPost(Post post);

    int incrementLikeCount(int postId);

    int insertLikeLog(@Param("userId") int userId, @Param("postId") int postId);
}
