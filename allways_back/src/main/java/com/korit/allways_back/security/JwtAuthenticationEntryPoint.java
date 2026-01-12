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
        // 1. 응답 타입을 JSON으로 설정
        response.setContentType("application/json;charset=UTF-8");
        // 2. 상태 코드를 401(Unauthorized)로 설정
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 3. 프론트엔드에게 전달할 에러 메시지 구성 (JSON 형태)
        // 실제로는 별도의 ErrorResponse 객체를 만들어 JSON으로 변환하는 것이 좋지만,
        // 이해를 돕기 위해 직접 문자열로 작성
        String jsonError = "{"
                + "\"status\": 401,"
                + "\"error\": \"Unauthorized\","
                + "\"message\": \"인증이 필요합니다. 로그인 후 다시 시도해주세요.\""
                + "}";

        response.getWriter().write(jsonError);
    }
}
