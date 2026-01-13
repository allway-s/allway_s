/** @jsxImportSource @emotion/react */
import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react'; // ArrowLeft는 더 이상 사용하지 않으므로 제거
import { s } from './MenuPage.styles.js';
import MainLogo from '../../assets/images/MainUpperImages/MainLogo.png';

const CATEGORIES = ['샌드위치', '샐러드', '랩&기타'];

const CATEGORY_PATH = {
  샌드위치: 'sandwich',
  샐러드: 'salad',
  '랩&기타': 'wrap',
};

const MOCK_DATA = {
  sandwich: [
    { id: 1, badge: 'NEW', nameKo: '랍스터&쉬림프', nameEn: 'Lobster & Shrimp', img: 'https://www.subway.co.kr/upload/menu/1763392140518_G1a9dG.png' },
    { id: 2, badge: 'NEW', nameKo: '랍스터', nameEn: 'Lobster', img: 'https://www.subway.co.kr/upload/menu/1763392124489_kSN1t9.png' },
    { id: 3, badge: 'SUBPICK', nameKo: 'New머쉬룸', nameEn: 'New Mushroom', img: 'https://www.subway.co.kr/upload/menu/1757375591323_zQLUtM.png' },
    { id: 4, badge: 'SUBPICK', nameKo: '안창 비프&New머쉬룸', nameEn: 'Beef & New Mushroom', img: 'https://www.subway.co.kr/upload/menu/%EC%95%88%EC%B0%BD-%EB%B9%84%ED%94%84&%EB%A8%B8%EC%89%AC%EB%A3%B8_20240912031749239.png' },
    { id: 5, badge: 'SUBPICK', subBadge: '추천', nameKo: '스테이크 & 치즈', nameEn: 'Steak & Cheese', img: 'https://www.subway.co.kr/upload/menu/Steak-&-Cheese_20211231095455613.png' },
    { id: 6, badge: 'SUBPICK', subBadge: '추천', nameKo: '이탈리안 비엠티', nameEn: 'Italian B.M.T.™', img: 'https://www.subway.co.kr/upload/menu/Italian_B.M.T_20211231094910899.png' },
  ],
  salad: [
    { id: 1, badge: 'NEW', nameKo: '토시 비프 & New 머쉬룸 샐러드', nameEn: 'TOSHI Beef & New Mushroom Salad', img: 'https://www.subway.co.kr/upload/menu/1757328156731_SMeD7j.png' },
    { id: 2, badge: 'NEW', nameKo: '토시 비프 샐러드', nameEn: 'TOSHI Beef Salad', img: 'https://www.subway.co.kr/upload/menu/1757328262726_R1C8GN.png' },
    { id: 3, badge: 'SUBPICK', nameKo: '이탈리안 비엠티', nameEn: 'Italian B.M.T™', img: 'https://www.subway.co.kr/upload/menu/%EC%9D%B4%ED%83%88%EB%A6%AC%EC%95%88%EB%B9%84%EC%97%A0%ED%8B%B0_20220413025527215.png' },
    { id: 4, badge: 'SUBPICK', nameKo: '비엘티', nameEn: 'B.L.T.', img: 'https://www.subway.co.kr/upload/menu/BLT_20220413025509426.png' },
    { id: 5, badge: 'SUBPICK', nameKo: '햄', nameEn: 'Ham', img: 'https://www.subway.co.kr/upload/menu/%ED%96%84_20220413025435077.png' },
    { id: 6, badge: 'SUBPICK', nameKo: '참치', nameEn: 'Tuna', img: 'https://www.subway.co.kr/upload/menu/%EC%B0%B8%EC%B9%98_20220413025420234.png' },
  ],
  wrap: [
    { id: 1, badge: '', nameKo: '스테이크 & 치즈 아보카도 랩', nameEn: 'Steak & Cheese Avocado Wrap', img: 'https://www.subway.co.kr/upload/menu/steak_n_cheese_avocado_wrap_20210315105638140.jpg' },
    { id: 2, badge: '', nameKo: '쉬림프 에그마요 랩', nameEn: 'Shrimp Egg Mayo Wrap', img: 'https://www.subway.co.kr/upload/menu/shrimp_egg_mayo_wrap_20210315105650669.jpg' },
    { id: 3, badge: '', nameKo: '치킨 베이컨 미니 랩', nameEn: 'Chicken Bacon Mini Wrap', img: 'https://www.subway.co.kr/upload/menu/chicken_bacon_mini_wrap_20210315105919945.jpg' },
  ]
};

export function MenuPage({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname.split('/').pop() || 'sandwich';
  
  const activeCat = useMemo(() => {
    return Object.keys(CATEGORY_PATH).find(key => CATEGORY_PATH[key] === currentPath) || '샌드위치';
  }, [currentPath]);

  const items = useMemo(() => {
    return MOCK_DATA[currentPath] || MOCK_DATA.sandwich;
  }, [currentPath]);

  return (
    <div css={s.page}>
      <header css={s.topBar}>
        <div css={s.topInner}>
          <div css={s.brandLeft}>
            {/* ✅ 뒤로가기 버튼(ArrowLeft)을 삭제하고 로고만 남겼습니다 */}
            <div css={s.brandMark} onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src={MainLogo} alt="Logo" css={s.logoImage} />
            </div>
          </div>

          <div css={s.brandCenter} onClick={() => navigate('/')}>
            ALLWAY-<span>S</span>
          </div>

          <nav css={s.topNav}>
            {isLoggedIn ? (
              <>
                <button css={s.topNavBtn} onClick={() => navigate('/cart')}>장바구니</button>
                <button css={s.topNavBtn} onClick={() => navigate('/mypage')}>마이페이지</button>
                <button css={s.topNavBtn} onClick={onLogout}>로그아웃</button>
              </>
            ) : (
              <>
                <button css={s.topNavBtn} onClick={() => navigate('/login')}><ShoppingCart size={20} /></button>
                <button css={s.topNavBtn} onClick={() => navigate('/login')}>로그인</button>
              </>
            )}
          </nav>
        </div>

        <div css={s.midBar}>
          <div css={s.lineWrap}><div css={s.TopLine} /></div>
          <div css={s.midContent}>
            <h1 css={s.pageTitle}>Menu</h1>
            <div css={s.categoryTabs}>
              {CATEGORIES.map((c, idx) => (
                <React.Fragment key={c}>
                  <button
                    css={s.tabBtn(c === activeCat)}
                    onClick={() => navigate(`/menu/${CATEGORY_PATH[c]}`)}
                  >
                    {c}
                  </button>
                  {idx !== CATEGORIES.length - 1 && <span css={s.tabDivider}>|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div css={s.lineWrap}><div css={s.BottomLine} /></div>
        </div>
      </header>

      <main css={s.main}>
        <div css={s.grid}>
          {items.map((it) => (
            <article key={it.id} css={s.card}>
              <div className="cardOverlay" css={s.cardOverlay}>
                {/* ✅ '랩&기타'가 아닐 때만 초록색 버튼 노출 */}
                {currentPath !== 'wrap' && (
                  <button css={s.hoverBtnGreen}>
                    쉽고 빠르게,<br />썹픽! 한 번에 주문
                  </button>
                )}

                {/* ✅ 노란색 버튼: 카테고리에 따라 텍스트 변경 */}
                <button css={s.hoverBtnYellow}>
                  {currentPath === 'wrap' ? (
                    "주문하기"
                  ) : (
                    <>내가 선택하는,<br />나만의 조합 주문</>
                  )}
                </button>
              </div>
              <div css={s.cardInner}>
                {(it.badge || it.subBadge) && (
                  <div css={s.badgeWrap}>
                    {it.badge && <span css={s.badge(it.badge)}>{it.badge}</span>}
                    {it.subBadge && <span css={s.subBadge}>{it.subBadge}</span>}
                  </div>
                )}
                <div css={s.imageArea}><img css={s.image} src={it.img} alt={it.nameKo} /></div>
                <div css={s.nameArea}>
                  <div css={s.nameKo}>{it.nameKo}</div>
                  <div css={s.nameEn}>{it.nameEn}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MenuPage;