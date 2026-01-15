package com.korit.allways_back.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        // 응답 타입을 JSON으로 설정
        response.setContentType("application/json;charset=UTF-8");
        // 상태 코드를 401(Unauthorized)로 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 프론트엔드에 전달할 에러 메시지
        String jsonError = "{"
                + "\"status\": 401,"
                + "\"error\": \"Unauthorized\","
                + "\"message\": \"인증이 필요합니다. 로그인 후 다시 시도해주세요.\""
                + "}";

        response.getWriter().write(jsonError);
    }
}
