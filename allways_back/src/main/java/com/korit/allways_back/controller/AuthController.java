package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.SignupRequestDto;
import com.korit.allways_back.entity.User;
import com.korit.allways_back.jwt.JwtTokenProvider;
import com.korit.allways_back.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequestDto signupRequestDto) {
        // DB 저장
        User registeredUser = userService.registerNewUser(signupRequestDto);

        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", jwtTokenProvider.createToken(registeredUser));
        response.put("message", "회원가입 완료");

        // 확인용
        System.out.println(registeredUser.getUserId());

        return ResponseEntity.ok().body(response);
    }
}
