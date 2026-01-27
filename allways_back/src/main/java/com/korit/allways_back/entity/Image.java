package com.korit.allways_back.entity;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    private Integer imageId;
    private String imgUrl;
    private Integer width;
    private Integer height;
}
