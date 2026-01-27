package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {

    int insert(User user);

    User findByUserId(@Param("userId") Integer userId);

    User findByOauth2Id(@Param("oauth2Id") String oauth2Id);

    int countByNickname(@Param("nickname") String nickname);
}