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

    // ✅ 조인용 필드
    private String nickname;      // user_tb.nickname
    private String imageUrl;      // item_tb -> image_tb.img_url
    private Integer itemPrice;    // item_tb.price (샌드위치 기본 가격)
}