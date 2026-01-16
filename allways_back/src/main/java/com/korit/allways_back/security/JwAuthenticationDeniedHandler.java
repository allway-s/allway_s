package com.korit.allways_back.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwAuthenticationDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        String jsonError = "{"
                + "\"status\": 403,"
                + "\"error\": \"Forbidden\","
                + "\"message\": \"접근 권한이 없습니다. 이미 로그인 상태이거나 접근할 수 없는 페이지입니다.\""
                + "}";

        response.getWriter().write(jsonError);
    }
}
