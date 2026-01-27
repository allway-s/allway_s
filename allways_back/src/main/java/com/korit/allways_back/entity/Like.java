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
public class Like {

    private Integer likeId;
    private Integer userId;
    private Integer postId;
    private LocalDateTime likedAt;

    // 조인용 필드 (필요시)
    private User user;
    private Post post;
}