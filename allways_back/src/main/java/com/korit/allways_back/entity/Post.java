package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    private int postId;
    private int presetId;
    private LocalDateTime postedAt;
    private int likeCnt;
    private String imgUrl;

}
