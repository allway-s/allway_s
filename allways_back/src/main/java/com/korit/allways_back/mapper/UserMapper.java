package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    int insert(User user);
    User findByUserId(int userId);
    User findByOauth2Id(String oauth2Id);

}
