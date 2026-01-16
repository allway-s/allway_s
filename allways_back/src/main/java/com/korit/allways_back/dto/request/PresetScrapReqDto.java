package com.korit.allways_back.dto.request;

import lombok.Data;

@Data
public class PresetScrapReqDto {
    private int userId;
    private int productId;
    private String presetName;
}
