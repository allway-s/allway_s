package com.korit.allways_back.security;

import com.korit.allways_back.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter

public class PrincipalUser extends DefaultOAuth2User {
    private final User user;

    public PrincipalUser(User user, Map<String, Object> attributes, String nameAttributeKey) {
        // 부모 클래스에 권한(ROLE_USER), 속성, 식별자 키를 전달
        super(List.of(new SimpleGrantedAuthority("ROLE_USER")), attributes, nameAttributeKey);
        this.user = user;
    }

    // 어디서든 유저 정보를 꺼내 쓸 수 있는 static 메서드
    public static PrincipalUser get() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof PrincipalUser)) {
            return null;
        }
        return (PrincipalUser) authentication.getPrincipal();
    }
}
