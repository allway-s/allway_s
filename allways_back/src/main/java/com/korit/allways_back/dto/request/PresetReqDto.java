package com.korit.allways_back.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PresetReqDto {

    private String presetName;
    private Integer productId;
    private Integer setId;
    private Integer selectedDrinkId;
    private Integer selectedSideId;
}