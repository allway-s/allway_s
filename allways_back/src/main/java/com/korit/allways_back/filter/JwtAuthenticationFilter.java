package com.korit.allways_back.filter;

import com.korit.allways_back.entity.User;
import com.korit.allways_back.jwt.JwtTokenProvider;
import com.korit.allways_back.mapper.UserMapper;
import com.korit.allways_back.security.PrincipalUser;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 헤더에서 토큰 추출
        String token = resolveToken(request);

        // 토큰이 유효한지 확인하기
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 토큰에서 값 꺼내기
            // userId를 기준(다른 것도 써도됨, 이메일 같은 거)
            int userId = jwtTokenProvider.getUserId(token);

            // DB에서 실제 유저 정보 조회
            User foundUser = userMapper.findByUserId(userId);
            System.out.println("필터 디버깅 - 조회된 유저 객체: " + foundUser); // ◀ 이게 null인지 확인

            if (foundUser != null) {
                // 성공 로그로 변경해서 혼동을 방지하세요
                System.out.println("필터 성공: 유저 인증 완료 - " + foundUser.getNickname());

                Collection<? extends GrantedAuthority> authorities =
                        List.of(new SimpleGrantedAuthority("ROLE_USER"));

                // 필요한 정보 attributes에 들어가는 Map에 넣으셈
                Map<String, Object> attributes = Map.of("id", foundUser.getUserId());
                PrincipalUser principalUser = new PrincipalUser(foundUser, attributes, "id");

                // password 딱히 안쓰니까 null
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(principalUser, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                System.out.println("필터 실패: DB에 유저가 없음 (userId 확인 필요)");
            }
        }

        // 다음 필터로
        filterChain.doFilter(request, response);
    }

    // JWT 검사를 하지 않고 통과할 주소
//    @Override
//    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
//        String path = request.getRequestURI();
//        return path.startsWith("/api/auth/");
//    }

    // 토큰 뜯어보는 메서드
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}