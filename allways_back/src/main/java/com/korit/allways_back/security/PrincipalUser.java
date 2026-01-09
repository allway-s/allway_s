package com.korit.allways_back.security;

import com.korit.allways_back.entity.User;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Getter
@RequiredArgsConstructor
public class PrincipalUser implements UserDetails, OAuth2User {
    // 우리가 만든 실제 DB 엔티티를 담아둡니다.
    private final User user;
    // 필터에서 부여한 권한 리스트를 담습니다.
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return null; // 소셜 로그인이므로 비밀번호는 없음
    }

    @Override
    public String getUsername() {
        return user.getEmail(); // 시큐리티에서 식별자로 쓸 값 (이메일 추천)
    }

    // 계정 활성화 여부 등 (모두 true로 설정)
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    /* --- OAuth2User 필수 구현 메서드 (나중을 위한 대비) --- */

    @Override
    public Map<String, Object> getAttributes() {
        return null; // 필요시 네이버/구글에서 받은 원본 데이터를 담음
    }

    @Override
    public String getName() {
        return user.getName();
    }

    public static PrincipalUser get() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !(authentication.getPrincipal() instanceof PrincipalUser)) {
            return null;
        }
        return (PrincipalUser) authentication.getPrincipal();
    }
}
