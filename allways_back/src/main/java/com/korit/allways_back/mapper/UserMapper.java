package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    // 사용자 추가
    int insert(User user);

    // ID로 조회
    User findByUserId(int userId);

    // OAuth2 ID로 조회
    User findByOauth2Id(String oauth2Id);

    // 닉네임 중복 체크
    int countByNickname(String nickname);
}