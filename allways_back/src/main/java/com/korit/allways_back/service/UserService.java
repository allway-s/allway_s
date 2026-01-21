package com.korit.allways_back.service;

import com.korit.allways_back.dto.request.SignupRequestDto;
import com.korit.allways_back.entity.User;
import com.korit.allways_back.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserMapper userMapper;

    // 닉네임 중복 확인 전용 메서드
    public boolean isNicknameDuplicate(String nickname) {
        return userMapper.countByNickname(nickname) > 0;
    }

    public User registerNewUser(SignupRequestDto dto) {

        if (isNicknameDuplicate(dto.getNickname())) {
            throw new RuntimeException("이미 사용 중인 닉네임입니다.");
        }

        // 중복 검사
        User existingUser = userMapper.findByOauth2Id(dto.getOauth2Id());
        if (existingUser != null) {
            return existingUser;
        }

        // dto -> user
        User user = User.builder()
                .oauth2Id(dto.getOauth2Id())
                .email(dto.getEmail())
                .name(dto.getName())
                .nickname(dto.getNickname())
                .phoneNumber(dto.getPhoneNumber())
                .address(dto.getAddress())
                .build();

            userMapper.insert(user);
        return user;
    }

}
