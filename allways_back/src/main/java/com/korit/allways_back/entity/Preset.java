package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Preset {

    private Integer presetId;
    private Integer userId;
    private Integer productId;
    private String presetName;
    private Integer postId;
    private Integer postedUserId;
    // 조인용 필드 (필요시)
    private User user;
    private Product product;
}