package com.korit.allways_back.dto.request;

import lombok.Data;

@Data
public class PostCreateRequestDto {
    private Integer presetId;  // ✅ presetId만 받음
    // userId 필드 제거 (토큰에서 추출하므로)
}