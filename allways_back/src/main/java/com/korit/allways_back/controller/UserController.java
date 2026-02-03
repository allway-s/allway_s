package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.SignupRequestDto;
import com.korit.allways_back.dto.response.UserRespDto;
import com.korit.allways_back.security.PrincipalUser;
import com.korit.allways_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService; // 유저 서비스


    @GetMapping("/me")
    public ResponseEntity<UserRespDto> tokenCheckValid() {
        PrincipalUser principalUser = PrincipalUser.get();

        if (principalUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        UserRespDto dto = UserRespDto.builder()
                .userId(principalUser.getUser().getUserId())
                .name(principalUser.getUser().getName())
                .email(principalUser.getUser().getEmail())
                .nickname(principalUser.getUser().getNickname())
                .phoneNumber(principalUser.getUser().getPhoneNumber())
                .build();

        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/signup") // 추가 회원가입
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto signupRequestDto) {
        // OAuth2 인증 후 부족한 정보(전화번호, 주소 등)를 받아 최종 가입 처리
        return ResponseEntity.ok(userService.registerNewUser(signupRequestDto));
    }

}