package com.korit.allways_back.config;

import com.korit.allways_back.filter.JwtAuthenticationFilter;
import com.korit.allways_back.security.JwtAuthenticationEntryPoint;
import com.korit.allways_back.security.OAuth2SuccessHandler;
import com.korit.allways_back.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final OAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults());
        // 1. CSRF 보안 비활성화 (Rest API이므로 불필요)
        http.csrf(csrf -> csrf.disable());

        // 2. 세션을 사용하지 않음 (JWT를 사용하기 때문)
        http.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 3. 요청 권한 설정
        http.authorizeHttpRequests(auth -> {
//            auth.requestMatchers("/oauth2/**", "/login/oauth2/**").permitAll();
//            auth.requestMatchers("/api/auth/**").permitAll();
//            auth.requestMatchers("/api/**").permitAll();
//            auth.requestMatchers("/swagger-ui/**").permitAll();
//            auth.requestMatchers("/swagger-ui.html").permitAll();
//            auth.requestMatchers("/v3/api-docs/**").permitAll();
//            auth.requestMatchers("/swagger-resources/**").permitAll();
//            auth.requestMatchers("/webjars/**").permitAll();
//            auth.requestMatchers("/doc").permitAll();
            auth.requestMatchers("/**").permitAll();
            // 로그인 관련 API는 누구나 접근 가능
            auth.anyRequest().authenticated();        // 그 외 모든 요청은 인증 필요
        });

        http.oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler) // 로그인 성공 시 처리할 핸들러
                .userInfoEndpoint(userInfo -> userInfo
                        .userService(oAuth2UserService) // 사용자 정보를 가져올 서비스
                )
        );

        // 4. JWT 필터를 UsernamePasswordAuthenticationFilter보다 먼저 실행하도록 설정
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));


        return http.build();
    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:5173"));
        corsConfiguration.setAllowedMethods(List.of("*"));
        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;

    }
}
