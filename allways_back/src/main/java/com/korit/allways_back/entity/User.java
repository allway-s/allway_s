package com.korit.allways_back.entity;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private Integer userId;
    private String oauth2Id;
    private String nickname;
    private String name;
    private String email;
    private String phoneNumber;
    private LocalDateTime createdAt;
}
