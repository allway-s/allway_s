/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styles } from './HomePage.styles.js';
import { ArrowRight } from 'lucide-react';

import { MainBanner } from './components/MainBanner.jsx';
import { PopularSection } from './components/PopularSection.jsx';
import { HomeMenu } from './components/HomeMenu.jsx';
import { BANNER_ITEMS } from './constants.js';

export function HomePage({
  isLoggedIn,
  onLogout,
  communityPreSets = [],
  onStartOrder,
  onNavigateToCommunity,
  onLike,
  onCopy,
  user
}) {
  const navigate = useNavigate();

  
  // 주문하기 버튼 클릭 핸들러 수정
  const handleOrderClick = () => {
    // 1. 사용자에게 이동 여부 묻기
    const isMove = window.confirm(
      "주문 페이지로 이동하시겠습니까?"
    );

    // 2. '확인'을 눌렀을 때만 페이지 이동
    if (isMove) {
      navigate('/menu');
    }
    // '취소'를 누르면 아무 일도 일어나지 않고 현재 페이지에 남습니다.
  };


  const handleCopy = (preset) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      navigate('/login');
      return;
    }

    if (onCopy) onCopy(preset);

    const isMove = window.confirm(
      `'${preset.title}' 레시피가 내 프리셋에 저장되었습니다.\n마이 프리셋 페이지로 이동하여 확인하시겠습니까?`
    );

  }


  return (
    <div css={styles.wrapper}>
      <MainBanner items={BANNER_ITEMS} />

      <section css={styles.heroSection}>
        <div css={styles.heroContent}>
          <h1 css={styles.heroTitle}>
            나만의 <span css={styles.heroTitleGreen}>Recipe</span> 를 만들고<br />
            <span css={styles.heroTitleGreen}>Recipe</span><span css={styles.heroTitleBlack}>-</span><span css={styles.heroTitleYellow}>s</span> 에 공유하세요!
          </h1>
          {/* 여기서 handleOrderClick을 사용하고 있습니다 */}
          <button onClick={handleOrderClick} css={styles.orderButton}>
            지금 주문하기 <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <HomeMenu />

      <PopularSection
        presets={communityPreSets}
        onNavigate={onNavigateToCommunity}
        onLike={onLike}
        onCopy={handleCopy}
        user={isLoggedIn ? user : null}
      />
    </div>
  );
}

