package com.korit.allways_back.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRespDto {

    private int userId;
    private String nickname;
    private String email;
    private String name;
    private String phoneNumber;

}
