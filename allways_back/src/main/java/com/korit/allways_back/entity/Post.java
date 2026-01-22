package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    private int postId;
    private int presetId;
    private int productId;
    private String presetName;
    private LocalDateTime postedAt;
    private int likeCnt;
    private String imgUrl;
    private List<String> ingredientNames;

    // [추가] 닉네임을 담을 필드
    private String nickname;

}
