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
public class Preset {

    private Integer presetId;
    private Integer userId;
    private Integer productId;
    private String presetName;
    private Integer setId;
    private Integer selectedDrinkId;
    private Integer selectedSideId;
    private Boolean isOriginal;
    private Integer originalUserId;
    private LocalDateTime createdAt;

    private String userNickname;
    private String originalUserNickname;
    private Product product;
    private String setName;
    private String drinkName;
    private String sideName;
    private String itemImageUrl;
}
