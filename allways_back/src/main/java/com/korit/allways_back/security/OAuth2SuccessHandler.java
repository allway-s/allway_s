package com.korit.allways_back.security;

import com.korit.allways_back.entity.User;
import com.korit.allways_back.jwt.JwtTokenProvider;
import com.korit.allways_back.mapper.UserMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        PrincipalUser principalUser = (PrincipalUser) authentication.getPrincipal();
        User user = principalUser.getUser();

        // DB에서 해당 ID로 등록된 유저가 있는지 확인
        User findUser = userMapper.findByOauth2Id(user.getOauth2Id());


        // 최초 로그인, oauth2Id, 이메일만 회원가입 페이지로 이동
        if (findUser == null) {
            String redirectUrl = String.format("http://localhost:5173/auth/signup?oauth2Id=%s&email=%s",
                    user.getOauth2Id(), user.getEmail());

            response.sendRedirect(redirectUrl);

        // 기존 유저 로그인
        } else {
            String accessToken = jwtTokenProvider.createToken(findUser);
            String redirectUrl = "http://localhost:5173/auth/oauth2/login/success?token=" + accessToken;

            response.sendRedirect(redirectUrl);
        }
    }
}


