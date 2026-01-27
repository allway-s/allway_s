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
    private Integer presetId;
    private Integer userId;
    private LocalDateTime postedAt;
    private Integer likeCount;

    // 조인용 필드 (필요시)
    private Preset preset;
    private List<Like> likes;
}