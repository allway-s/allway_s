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
  // ✅ 유저 객체가 존재하고 내부 정보가 있는지 체크
  const isLoggedInUser = user && (user.name || user.id || Object.keys(user).length > 0);

  const topPreSets = [...presets]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 3);

  return (
    <section css={S.section}>
      <div css={S.container}>
        <div css={S.header}>
            <h2 css={S.title}>Recipe Community</h2>
            <div css={S.headerRight}>
                {/* ✅ 유저 정보 유무에 따른 문구 조건부 렌더링 */}
                {!isLoggedInUser ? (
                  <span css={S.headerText}>로그인 후 더 다양한 조합들을 만나보세요!</span>
                ) : (
                  <span css={S.headerText}>{user.name || '진현'}님을 위한 인기 레시피입니다!</span>
                )}

                <button onClick={onNavigate} css={S.iconButton}>
                  <ChevronRight size={24} />
                </button>
            </div>
        </div>
        
        <div css={S.grid}>
          {topPreSets.map((preset, index) => (
            <div key={preset.id} css={S.cardWrapper}>
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