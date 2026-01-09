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

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserMapper userMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 1. 요청 헤더에서 이름표(Bearer)를 떼고 알맹이(토큰)만 추출
        String token = resolveToken(request);

        // 2. 토큰이 유효한지 확인
        if (token != null && jwtTokenProvider.validateToken(token)) {
            // 3. 토큰에서 사용자 식별값 추출 (userId 대신 이메일이나 oauth2Id를 쓸 수도 있음)
            // 여기서는 예전 코드처럼 userId를 기준으로 작성합니다.
            int userId = jwtTokenProvider.getUserId(token);

            // 4. DB에서 실제 유저 정보 조회
            User foundUser = userMapper.findByUserId(userId);

            if (foundUser != null) {
                // 5. 인증 객체 생성 및 SecurityContext 등록
                // authorities: ROLE_USER 등의 권한 정보
                Collection<? extends GrantedAuthority> authorities =
                        List.of(new SimpleGrantedAuthority("ROLE_USER"));

                // PrincipalUser: 시큐리티가 사용할 커스텀 유저 객체
                PrincipalUser principalUser = new PrincipalUser(foundUser, authorities);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(principalUser, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // 6. 다음 필터로 진행
        filterChain.doFilter(request, response);
    }


    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
