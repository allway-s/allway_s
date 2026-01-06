/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Heart, Copy, User } from 'lucide-react';
import { styles } from '../pages/styles'; // 경로가 정확한지 다시 한번 확인해 주세요! 🔍

export function PresetCard({ preset, onLike, onCopy, user }) {
  if (!preset) return null;

  return (
    <div css={styles.card}>
      {/* 1. 이미지 영역 (Placeholder) */}
      <div css={styles.cardImagePlaceholder}>
        <span style={{ color: '#009223', fontWeight: 'bold', fontSize: '1.125rem' }}>
          {preset.title}
        </span>
      </div>

      {/* 2. 카드 내용 영역 */}
      <div css={styles.cardContent}>
        
        {/* 헤더 부분: 제목과 작성자 */}
        <div css={styles.cardHeader}>
          <div>
            <h3 css={styles.cardTitle}>{preset.title}</h3>
            <div css={styles.authorBox}>
              <User size={14} />
              <span>{preset.author || '익명 사용자'}</span>
            </div>
          </div>
        </div>

        {/* 푸터 부분: 인터랙션 버튼들 */}
        <div css={styles.cardFooter}>
          <div css={styles.iconGroup}>
            {/* 좋아요 버튼 */}
            <button 
              onClick={() => onLike(preset.id)}
              css={styles.actionButton('like')}
            >
              <Heart size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                {preset.likes || 0}
              </span>
            </button>

            {/* 복사 버튼 */}
            <button 
              onClick={() => onCopy(preset)}
              css={styles.actionButton('copy')}
            >
              <Copy size={20} />
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>복사</span>
            </button>
          </div>
          
          {/* 상세보기 버튼 */}
          <button css={styles.detailButton}>
            상세보기
          </button>
        </div>
      </div>
    </div>
  );
}