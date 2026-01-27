package com.korit.allways_back.dto.request;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostReqDto {

    private Integer postId;
    private String userNickname;  // 작성자
    private String presetName;    // 조합 이름
    private String itemName;      // 베이스 메뉴 이름
    private String itemImageUrl;  // 상품 이미지
    private List<String> ingredientNames; // 포함된 재료들 (텍스트 리스트)
    private Integer likeCount;    // 좋아요 수
    private Boolean isLikedByMe;  // 내가 좋아요 눌렀는지 여부
    private LocalDateTime postedAt;

}

