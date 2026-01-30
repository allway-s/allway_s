package com.korit.allways_back.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    @NotBlank(message = "OAuth2 ID는 필수입니다.")
    private String oauth2Id;

    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "이메일 형식이 올바르지 않습니다.")
    private String email;

    @NotBlank(message = "이름은 필수입니다.")
    @Pattern(regexp = "^[가-힣a-zA-Z]{2,20}$", message = "이름은 한글 또는 영문 2~20자여야 합니다.")
    private String name;

    @NotBlank(message = "닉네임은 필수입니다.")
    @Pattern(regexp = "^[가-힣a-zA-Z0-9]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자여야 합니다.")
    private String nickname;

    @NotBlank(message = "전화번호는 필수입니다.")
    @Pattern(regexp = "^01(?:0|1|[6-9])-(?:\\d{3}|\\d{4})-\\d{4}$", message = "전화번호 형식(010-0000-0000)이 올바르지 않습니다.")
    private String phoneNumber;
}