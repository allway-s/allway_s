package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Post {


    private Integer postId;
    private Integer userId;
    private LocalDateTime postedAt;
    private Integer likeCount;
    private String imgUrl;
    private String presetName;
    private String itemName;
    private String nickname;

    // 내가 좋아요를 눌렀는지
    private Boolean liked;

    // 재료 리스트 (ingredientName, ingredientCategoryId) 카테고리id로 재료 구분
    private List<Ingredient> ingredients;
}
