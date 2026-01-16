/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { PresetCard } from '../../../components/PresetCard.jsx';
import { S } from './PopularSection.styles.js';

export function PopularSection({ 
  presets = [], 
  onNavigate, 
  onLike, 
  onCopy, 
  user 
}) {
  const navigate = useNavigate();
  
  // ✅ 유저 로그인 여부 판단
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
                {!isLoggedInUser ? (
                  <span css={S.headerText}>로그인 후 더 다양한 조합들을 만나보세요!</span>
                ) : (
                  <span css={S.headerText}>{user.name || '진현'}님을 위한 인기 레시피입니다!</span>
                )}

                <button onClick={() => navigate("/community")} css={S.iconButton}>
                  <ChevronRight size={24} />
                </button>
            </div>
        </div>
        
        <div css={S.grid}>
          {/* ✅ 비로그인 시 카드 중앙에 안내 버튼 노출 */}
          {!isLoggedInUser && (
            <button 
              css={S.blurMessage} 
              onClick={() => navigate('/login')}
            >
              로그인하고 인기 레시피 확인하기
            </button>
          )}

          {topPreSets.map((preset, index) => (
            <div 
              key={preset.id} 
              /* ✅ 로그인 안됐을 때만 true 전달하여 블러 처리 */
              css={S.cardWrapper(!isLoggedInUser)}
            >
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