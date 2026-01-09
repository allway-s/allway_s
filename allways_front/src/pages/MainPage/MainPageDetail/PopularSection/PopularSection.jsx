/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { PresetCard } from '../../../../components/PresetCard.jsx';
import { S } from './PopularSection.styles.js';

export function PopularSection({ 
  presets = [], 
  onNavigate, 
  onLike, 
  onCopy, 
  user 
}) {
  /** [내부 로직] 좋아요 순으로 상위 3개 추출 */
  const topPreSets = [...presets]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 3);

  return (
    <section css={S.section}>
      <div css={S.container}>
        <div css={S.header}>
            <h2 css={S.title}>Recipe Community</h2>
            <div css={S.headerRight}>
                <span css={S.headerText}>로그인 후 더 다양한 조합들을 만나보세요!</span>
                <button onClick={onNavigate} css={S.iconButton}>
                <ChevronRight size={24} /> {/* ArrowRight 대신 ChevronRight가 시안과 비슷합니다 */}
                </button>
            </div>
        </div>
        
        <div css={S.grid}>
          {topPreSets.map((preset, index) => (
            <div key={preset.id} css={S.cardWrapper}>
              {/* 1등에게만 뱃지 표시 */}
              {index === 0 && (
                <div css={S.bestBadge}>
                  <TrendingUp size={24} />
                </div>
              )}
              <PresetCard 
                preset={preset} 
                onLike={onLike} 
                onCopy={onCopy} 
                user={user} 
                showLoadButton={false} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}