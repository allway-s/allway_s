package com.korit.allways_back.dto.request;

import lombok.Data;

@Data
public class PresetRequestDto {
    private Integer postId;
    private Integer productId;
    private Integer userId;
    private String presetName;
}
