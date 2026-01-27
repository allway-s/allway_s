package com.korit.allways_back.dto.response;

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
public class PostRespDto {

    private Integer postId;
    private Integer presetId;
    private Integer productId;
    private String presetName;
    private String userNickname;
    private LocalDateTime postedAt;
    private Integer likeCount;
    private Integer viewCount;
    private String itemImageUrl;
    private List<String> ingredientNames;
    private Boolean isLikedByMe;
}
