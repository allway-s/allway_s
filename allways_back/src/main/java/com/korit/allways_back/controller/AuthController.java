package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.SignupRequestDto;
import com.korit.allways_back.entity.User;
import com.korit.allways_back.jwt.JwtTokenProvider;
import com.korit.allways_back.mapper.UserMapper;
import com.korit.allways_back.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequestDto signupRequestDto) {
        // DB 저장
        User registeredUser = userService.registerNewUser(signupRequestDto);

        // 응답 json 형태로
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", jwtTokenProvider.createToken(registeredUser));
        response.put("message", "회원가입 완료");

        // 확인용
        System.out.println(registeredUser.getUserId());

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        return ResponseEntity.ok(userService.isNicknameDuplicate(nickname));
    }
}
