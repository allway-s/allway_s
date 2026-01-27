package com.korit.allways_back.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SetMenu {

    private Integer setId;
    private String setName;

    // 조인용 필드 (필요시)
    @JsonIgnore
    private List<SetComponent> components;
}