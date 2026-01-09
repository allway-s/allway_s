/** @jsxImportSource @emotion/react */
import React from 'react';
import { styles } from './HomePage.styles.js'; 
import { ArrowRight, ShoppingCart } from 'lucide-react'; 

import { MainBanner } from '../MainPageDetail/MainBanner/MainBanner.jsx';
import { PopularSection } from '../MainPageDetail/PopularSection/PopularSection.jsx';
import { FeatureSection } from '../MainPageDetail/FeatureSection/FeatureSection.jsx';

// 데이터 상수
import { BANNER_ITEMS } from './constants.js'; 
import { HomeMenu } from '../HomeMenu/HomeMenu.jsx';

export function HomePage({ 
  communityPreSets = [], 
  onStartOrder, 
  onNavigateToCommunity, 
  onLike, 
  onCopy, 
  user 
}) {
  
  return (
    <div css={styles.wrapper}>
      {/* 1. 헤더 영역*/}
      <header css={styles.header}>
        <div css={styles.headerInner}>
          <div css={styles.logoArea}>
            <h2 style={{ color: '#009223', fontWeight: 900, margin: 0, fontSize: '1.5rem', cursor: 'pointer' }}>
              ALLWAY-S
            </h2>
          </div>
          <div css={styles.utilMenu}>
            <button aria-label="장바구니"><ShoppingCart size={24} /></button>
            <button>로그인</button>
          </div>
        </div>
      </header>

      {/* 2. 메인 배너 섹션*/}
      <MainBanner items={BANNER_ITEMS} />

      {/* 3. 히어로 섹션*/}
      <section css={styles.heroSection}>
        <div css={styles.heroContent}>
          <h1 css={styles.heroTitle}>
            나만의 <span css={styles.heroTitleGreen}>Recipe</span> 를 만들고<br />
            <span css={styles.heroTitleGreen}>Recipe</span><span css={styles.heroTitleYellow}>-s</span> 에 공유하세요!
          </h1>
          <button onClick={onStartOrder} css={styles.orderButton}>
            지금 주문하기 <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/*4. 메뉴영역 추가 예정 */}
      <HomeMenu />

      {/* 5. 인기 프리셋 섹션 */}
      <PopularSection 
        presets={communityPreSets} 
        onNavigate={onNavigateToCommunity}
        onLike={onLike}
        onCopy={onCopy}
        user={user}
      />

      {/* 5. 서비스 특징 섹션 (분절 완료) */}
      
    </div>
  );
}