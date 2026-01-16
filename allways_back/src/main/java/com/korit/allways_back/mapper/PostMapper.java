package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Post;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface PostMapper {

    void createPost(Post post);

}
