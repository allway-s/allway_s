package com.korit.allways_back.config;

import com.korit.allways_back.filter.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // 1. CSRF 보안 비활성화 (Rest API이므로 불필요)
        http.csrf(csrf -> csrf.disable());

        // 2. 세션을 사용하지 않음 (JWT를 사용하기 때문)
        http.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 3. 요청 권한 설정
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll() // 로그인 관련 API는 누구나 접근 가능
                .anyRequest().authenticated()           // 그 외 모든 요청은 인증 필요
        );

        // 4. JWT 필터를 UsernamePasswordAuthenticationFilter보다 먼저 실행하도록 설정
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
