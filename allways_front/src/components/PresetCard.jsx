/** @jsxImportSource @emotion/react */
import React from 'react';
import { Heart, Plus } from 'lucide-react'; // Copy 대신 Plus 사용
import { S } from './PresetCard.styles';

export function PresetCard({ preset, onLike, onCopy }) {
  if (!preset) return null;

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
        <button onClick={() => onLike(preset.id)} css={S.likeButton}>
          <Heart size={28} color="#000" />
          <span css={S.likeCount}>{preset.likes || 0}</span>
        </button>
      </div>
    </div>
  );
}