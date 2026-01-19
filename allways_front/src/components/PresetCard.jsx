/** @jsxImportSource @emotion/react */
import React from 'react';
import { Heart, Plus } from 'lucide-react'; // Copy 대신 Plus 사용
import { S } from './PresetCard.styles';

export function PresetCard({ preset, onLike, onCopy }) {
  if (!preset) return null;

// ✅ 좋아요 여부에 따라 색상 결정 (데이터에 isLiked가 있다고 가정)
  const isLiked = preset.isLiked;
  const likedColor = "#ff4d4f"; 
  const defaultColor = "#000";

  return (
    <div css={S.card}>
      {/* 1. 우측 상단 플러스 버튼 (복사 기능) */}
      <button onClick={() => onCopy(preset)} css={S.plusButton}>
        <Plus size={24} color="#000" strokeWidth={3} />
      </button>

      {/* 2. 이미지 영역 (글자 대신 실제 사진) */}
      <div css={S.imageWrapper}>
        <img src={preset.image} alt={preset.title} css={S.image} />
      </div>

      {/* 3. 텍스트 정보 영역 */}
      <div css={S.content}>
        <h3 css={S.cardTitle}>{preset.title}</h3>
        <p css={S.authorText}>작성자 : {preset.author || '익명'}</p>
      </div>

      {/* 4. 우측 하단 좋아요 영역 (세로 배치) */}
      <div css={S.footer}>
        {/* ✅ 2. likeButton 스타일에 isLiked 전달 */}
        <button onClick={() => onLike(preset.id)} css={S.likeButton(isLiked)}>
          <Heart 
            size={28} 
            /* ✅ 3. 하트 아이콘의 색상과 채우기 상태 제어 */
            color={isLiked ? likedColor : defaultColor} 
            fill={isLiked ? likedColor : "none"} 
          />
          {/* ✅ 4. likeCount 스타일에 isLiked 전달하여 숫자 색상 변경 */}
          <span css={S.likeCount(isLiked)}>{preset.likes || 0}</span>
        </button>
      </div>
    </div>
  );
} 