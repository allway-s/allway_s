package com.korit.allways_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    private String oauth2Id;    // 주소창에서 가져온 고유 ID
    private String email;       // 주소창에서 가져온 이메일
    private String name;        // 사용자가 직접 입력한 실명 (추가)
    private String nickname;    // 사용자가 사용할 닉네임
    private String phoneNumber; // 사용자가 입력한 폰 번호 (추가)
    private String address;     // 사용자가 입력한 주소
}
