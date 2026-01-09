/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useCallback } from 'react';
// styles.js에서 정의한 스타일 객체를 불러옵니다.
import { styles } from './styles'; 
import { ArrowRight, TrendingUp, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'; 
import { PresetCard } from '../components/PresetCard';

// 이미지 에셋 (경로에 맞춰 실제 이미지가 있어야 합니다)
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';

/** [데이터] 하단 특징 리스트 섹션용 데이터 */
const FEATURE_LIST = [
  { id: 1, title: "5단계 스마트 빌더", desc: "복잡한 주문 과정을 간소화합니다." },
  { id: 2, title: "레시피 공유 & 저장", desc: "나만의 꿀조합을 저장하고 공유하세요." },
  { id: 3, title: "유연한 수령 방식", desc: "원하는 방식을 선택하여 편리하게 주문하세요." }
];

/** [데이터] 메인 상단 배너용 데이터 */
const BANNER_ITEMS = [
  { 
    id: 1, 
    color: '#009223', 
    title: '에그마요의\n화려한 변신!', 
    sub: '서브웨이 부동의 1위 레시피를 만나보세요',
    image: image1
  },
  { 
    id: 2, 
    color: '#FFC608', 
    title: '이달의 꿀조합\nTOP 10', 
    sub: '커뮤니티가 인정한 진짜 맛있는 조합',
    image: image2
  },
  { 
    id: 3, 
    color: '#002D62', 
    title: 'All-Way-S\n신규 런칭!', 
    sub: '지금 바로 나만의 샌드위치를 저장하세요',
    image: image3
  },
];

export function HomePage({ 
  communityPreSets = [], onStartOrder, onNavigateToCommunity, onLike, onCopy, user 
}) {
  /** [배너 로직 1] 무한 슬라이드를 위한 데이터 복제 
   * 원본이 [1, 2, 3]이라면 [3, 1, 2, 3, 1] 형태로 배열을 구성하여 끊김 없는 루프를 만듭니다.
   */
  const extendedSlides = [BANNER_ITEMS[BANNER_ITEMS.length - 1], ...BANNER_ITEMS, BANNER_ITEMS[0]];
  
  const [currentSlide, setCurrentSlide] = useState(1); // 복제된 데이터 때문에 index 1(첫번째 원본)에서 시작
  const [isTransitioning, setIsTransitioning] = useState(true); // 애니메이션 실행 여부 제어

  /** [배너 로직 2] 다음/이전 슬라이드 이동 함수 */
  const nextSlide = useCallback(() => {
    if (currentSlide >= extendedSlides.length - 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  }, [currentSlide, extendedSlides.length]);

  const prevSlide = () => {
    if (currentSlide <= 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  /** [배너 로직 3] 무한 루프 핵심: 끝에 도달했을 때 눈속임 점프 
   * styles.js에 설정한 transition 시간(0.6s)이 끝난 후, 사용자 몰래 슬라이드 위치를 제자리로 돌립니다.
   */
  useEffect(() => {
    // 마지막 복제본(1번)에 도달했을 때
    if (currentSlide === extendedSlides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false); // 애니메이션 끄기
        setCurrentSlide(1); // 실제 1번 위치로 점프
      }, 600); 
    }
    // 첫번째 복제본(3번)에 도달했을 때
    if (currentSlide === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(extendedSlides.length - 2); // 실제 마지막 위치로 점프
      }, 600);
    }
  }, [currentSlide, extendedSlides.length]);

  /** [배너 로직 4] 자동 재생 (5초마다 이동) */
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  /** [인기 레시피] 좋아요 순으로 상위 3개만 추출 */
  const topPreSets = [...communityPreSets]
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 3);

  return (
    <div css={styles.wrapper}>
      {/* 1. 헤더 영역: 로고와 유틸 메뉴 */}
      <header css={styles.header}>
        <div css={styles.headerInner}>
          <div css={styles.logoArea}>
            <h2 style={{ color: '#009223', fontWeight: 900, margin: 0, fontSize: '1.5rem', cursor: 'pointer' }}>
              ALLWAY-S
            </h2>
          </div>
          <div css={styles.utilMenu}>
            <button aria-label="장바구니">
              <ShoppingCart size={24} />
            </button>
            <button>로그인</button>
          </div>
        </div>
      </header>

      {/* 2. 메인 배너 섹션 (무한 슬라이더) */}
      <section css={styles.bannerSection}>
        {/* 좌우 화살표 버튼 (hover 시 opacity가 조절됨) */}
        <button className="arrow-btn" css={styles.arrowButton('left')} onClick={prevSlide}>
          <ChevronLeft size={32} />
        </button>
        <button className="arrow-btn" css={styles.arrowButton('right')} onClick={nextSlide}>
          <ChevronRight size={32} />
        </button>

        {/* 실제 움직이는 슬라이더 본체 */}
        <div 
          css={styles.bannerWrapper} 
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
          }}
        >
          {extendedSlides.map((item, idx) => (
            <div 
              key={`${item.id}-${idx}`} 
              css={styles.bannerItem} 
              style={{ backgroundColor: item.color }}
            >
              <div css={styles.bannerContent}>
                <div css={styles.bannerText}>
                  <h2 style={{ whiteSpace: 'pre-line' }}>{item.title}</h2>
                  <p>{item.sub}</p>
                </div>
                <div css={styles.bannerImageArea}>
                  <img src={item.image} alt={item.title} css={styles.bannerImg} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 점(Indicator) 영역: 현재 위치 표시 */}
        <div css={styles.bannerDots}>
          {BANNER_ITEMS.map((_, i) => {
            // 현재 슬라이드가 원본 혹은 복제본 중 어디에 있든 해당 인덱스의 점이 활성화되도록 계산
            const isActive = (currentSlide === i + 1 || (currentSlide === 0 && i === BANNER_ITEMS.length - 1) || (currentSlide === extendedSlides.length - 1 && i === 0));
            return (
              <div 
                key={i} 
                // styles.js의 dot 스타일은 (isActive)를 인자로 받는 함수여야 함
                css={styles.dot(isActive)} 
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentSlide(i + 1);
                }}
              />
            );
          })}
        </div>
      </section>

      {/* 3. 히어로 섹션: 중앙 문구 및 주문하기 버튼 */}
      <section css={styles.heroSection}>
        <div css={styles.heroContent}>
          <h1 css={styles.heroTitle}>나만의 <span css={styles.heroTitleGreen}>꿀조합</span>을 만들고 공유하세요</h1>
          <button onClick={onStartOrder} css={styles.orderButton}>
            지금 주문하기 <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}