package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.SignupRequestDto;
import com.korit.allways_back.entity.User;
import com.korit.allways_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto signupRequestDto) {
        User registeredUser = userService.registerNewUser(signupRequestDto);
        // 1. 서비스 호출하여 DB 저장 (기존에 만든 registerUser 메서드 활용)

        System.out.println("가입된 유저 ID: " + registeredUser.getUserId());
        // 2. 성공 응답 반환
        // 나중에는 여기서 JWT 토큰을 생성해서 같이 보내주면 바로 로그인이 됩니다!
        return ResponseEntity.ok().body("회원가입이 완료");
    }
}
