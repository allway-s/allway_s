package com.korit.allways_back.service;

import com.korit.allways_back.entity.User;
import com.korit.allways_back.security.PrincipalUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class OAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // 정보 가져오기
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // registrationId는 naver, google 등 clientName
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        // 응답 데이터 원본
        Map<String, Object> attributes = oAuth2User.getAttributes();

        // 우리가 추출할 정보를 담을 변수들
        Map<String, Object> response = null;
        String oauth2Id = null;
        String email = null;
        String nameAttributeKey = null;

        // 플랫폼 별로 처리
        if ("naver".equalsIgnoreCase(registrationId)) {
            // 네이버는 'response' 키 안에 실제 정보가 들어있음
            response = (Map<String, Object>) attributes.get("response");
            oauth2Id = (String) response.get("id");
            email = (String) response.get("email");
            nameAttributeKey = "id"; // 네이버의 식별자 키 이름
        }
        else if ("google".equalsIgnoreCase(registrationId)) {
            // 나중에 구글 추가 시 여기에 작성 (구글은 attributes에 바로 데이터가 있음)
            response = attributes;
            oauth2Id = (String) response.get("sub");
            email = (String) response.get("email");
            nameAttributeKey = "sub";
        }

        // User 엔티티
        User user = User.builder()
                .oauth2Id(oauth2Id)
                .email(email)
                .build();

        // principalUser에 정보 저장
        return new PrincipalUser(user, response, nameAttributeKey);
    }
}
