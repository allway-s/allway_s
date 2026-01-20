package com.korit.allways_back.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Preset {

    private int presetId;
    private int userId;
    private int productId;
    private String presetName;
    private String imgUrl;
}
