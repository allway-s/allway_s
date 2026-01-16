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
        // 다른 도메인도 허용
        http.cors(Customizer.withDefaults());
        // Rest API라서 CSRF 비활
        http.csrf(csrf -> csrf.disable());

        // JWT를 사용하니까 세션 사용안함
        http.sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // 권한 설정
        http.authorizeHttpRequests(auth -> {
            // 로그인 관련으로 누구나 접근가능하게
            auth.requestMatchers("/", "/login", "/signup").permitAll();
            auth.requestMatchers("/api/auth/**").permitAll();

            // swagger 관련 필요한 설정
            auth.requestMatchers(
                    "/swagger-ui/**", "/swagger-ui.html", "/v3/api-docs/**",
                    "/swagger-resources/**", "/webjars/**", "/doc"
            ).permitAll();

            // 나중에 authenticated 해줘야할 것들
            auth.requestMatchers("/api/v1/orders/**").permitAll();

            // 그 외 모든 요청은 인증 필요
            auth.anyRequest().authenticated();
        });

        http.oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2SuccessHandler) // 로그인 성공 시 처리할 핸들러
                .userInfoEndpoint(userInfo -> userInfo
                        .userService(oAuth2UserService) // 사용자 정보를 가져올 서비스
                )
        );

        // UsernamePasswordAuthenticationFilter보다 먼저 실행하도록 설정
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling(exception -> exception.authenticationEntryPoint(jwtAuthenticationEntryPoint));


        return http.build();
    }
    // cors 허용 범위 설정
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
