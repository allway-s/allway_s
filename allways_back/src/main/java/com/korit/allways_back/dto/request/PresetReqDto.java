package com.korit.allways_back.dto.request;

import lombok.Data;

@Data
public class PresetReqDto {

    private int productId;
    private int userId;
    private String presetName;

}
