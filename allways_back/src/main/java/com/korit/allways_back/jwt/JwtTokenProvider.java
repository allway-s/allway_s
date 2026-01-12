package com.korit.allways_back.jwt;

import com.korit.allways_back.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private final SecretKey key;

    public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
        // 1. Base64로 된 88글자를 진짜 64바이트 데이터로 해독(Decode)
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        // 2. 해독된 데이터를 바탕으로 HMAC-SHA 키 생성
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // User 엔티티를 받아서 토큰 생성
    public String createToken(User user) {
        Date now = new Date();
        Date expiredTime = new Date(now.getTime() + (5 * 60 * 1000)); // 24시간

        return Jwts.builder()
                .subject(user.getEmail())             // 이메일
                .claim("userId", user.getUserId())    // DB 식별자 (int)
                .claim("auth", "ROLE_USER")
                .issuedAt(now)
                .expiration(expiredTime)
                .signWith(key) // 아까 만든 64바이트 SecretKey (HS512 자동적용)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    // 토큰에서 데이터 추출
    public Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload(); // 최신 0.12.x 문법 (getBody 대신)
    }

    public int getUserId(String token) {
        // 1. 토큰에서 Claims(데이터 덩어리)를 꺼냅니다.
        Claims claims = getClaims(token);

        // 2. 아까 createToken 할 때 담았던 "userId" 키값을 꺼내서 숫자로 바꿉니다.
        return claims.get("userId", Integer.class);
    }

}
