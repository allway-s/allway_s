/** @jsxImportSource @emotion/react */
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { s } from './styles';
import MainLogo from '../../assets/images/MainUpperImages/MainLogo2.png';

const CATEGORIES = ['샌드위치', '샐러드', '랩&기타'];

const CATEGORY_PATH = {
  샌드위치: 'sandwich',
  샐러드: 'salad',
  '랩&기타': 'wrap',
};

const SAMPLE_ITEMS = [
  {
    id: 1,
    badge: 'NEW',
    nameKo: '토시 비프 & New 머쉬룸 샐러드',
    nameEn: 'TOSHI Beef & New Mushroom Salad',
    img: '	https://www.subway.co.kr/upload/menu/1757328156731_SMeD7j.png',
  },
  {
    id: 2,
    badge: 'NEW',
    nameKo: '토시 비프 샐러드',
    nameEn: 'TOSHI Beef Salad',
    img: 'https://www.subway.co.kr/upload/menu/1757328262726_R1C8GN.png',
  },
  {
    id: 3,
    badge: 'SUBPICK',
    nameKo: '이탈리안 비엠티',
    nameEn: 'Italian B.M.T™',
    img: 'https://www.subway.co.kr/upload/menu/%EC%9D%B4%ED%83%88%EB%A6%AC%EC%95%88%EB%B9%84%EC%97%A0%ED%8B%B0_20220413025527215.png',
  },
  {
    id: 4,
    badge: 'SUBPICK',
    nameKo: '비엘티',
    nameEn: 'B.L.T.',
    img: '	https://www.subway.co.kr/upload/menu/BLT_20220413025509426.png',
  },
  {
    id: 5,
    badge: 'SUBPICK',
    nameKo: '햄',
    nameEn: 'Ham',
    img: 'https://www.subway.co.kr/upload/menu/%ED%96%84_20220413025435077.png',
  },
  {
    id: 6,
    badge: 'SUBPICK',
    nameKo: '참치',
    nameEn: 'Tuna',
    img: '	https://www.subway.co.kr/upload/menu/%EC%B0%B8%EC%B9%98_20220413025420234.png',
  },
];

export function MenuPage() {
  const [activeCat, setActiveCat] = useState('샐러드');
  const navigate = useNavigate();

  const items = useMemo(() => {
    // 실제론 activeCat에 따라 필터링
    return SAMPLE_ITEMS;
  }, [activeCat]);

  return (
    <div css={s.page}>
      {/* 1) Top bar */}
      <header css={s.topBar}>
        <div css={s.topInner}>
          <div css={s.brandLeft}>
            <div className='logo-section' onClick={() => navigate('/')}>
              <img src={MainLogo} alt='Logo' />
            </div>
          </div>

          <div
            css={s.brandCenter}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            <h2
              style={{
                color: '#009223',
                fontWeight: 900,
                margin: 0,
                fontSize: '1.5rem',
              }}
            >
              ALLWAY<span style={{ color: '#000000' }}>-</span>
              <span style={{ color: '#ffc107' }}>S</span>
            </h2>
          </div>

          <nav css={s.topNav}>
            <button onClick={() => navigate('/cart')} css={s.topNavBtn}>
              장바구니
            </button>
            <button onClick={() => navigate('/mypage')} css={s.topNavBtn}>
              마이페이지
            </button>
            <button onClick={() => navigate('/')} css={s.topNavBtn}>
              로그아웃
            </button>
          </nav>
        </div>

        <div css={s.midBar}>
          <div css={s.lineWrap}>
            <div css={s.TopLine} />
          </div>

          <div css={s.midContent}>
            <h1 css={s.pageTitle}>Menu</h1>

            <div css={s.categoryTabs}>
              {CATEGORIES.map((c, idx) => (
                <React.Fragment key={c}>
                  <button
                    css={s.tabBtn(c === activeCat)}
                    onClick={() => {
                      setActiveCat(c);
                      navigate(`/menu/${CATEGORY_PATH[c]}`);
                    }}
                  >
                    {c}
                  </button>
                  {idx !== CATEGORIES.length - 1 && (
                    <span css={s.tabDivider}>|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div css={s.lineWrap}>
            <div css={s.BottomLine} />
          </div>
        </div>
      </header>

      {/* 3) Grid */}
      <main css={s.main}>
        <div css={s.grid}>
          {items.map((it) => (
            <article key={it.id} css={s.card}>
              {/* ✅ 회색까지 덮는 overlay */}
              <div className='cardOverlay' css={s.cardOverlay}>
                <button css={s.hoverBtnGreen}>
                  쉽고 빠르게,
                  <br />
                  썹픽! 한 번에 주문
                </button>
                <button css={s.hoverBtnYellow}>
                  내가 선택하는,
                  <br />
                  나만의 조합 주문
                </button>
              </div>

              <div css={s.cardInner}>
                {(it.badge || it.subBadge) && (
                  <div css={s.badgeWrap}>
                    {it.badge && (
                      <span css={s.badge(it.badge)}>{it.badge}</span>
                    )}
                    {it.subBadge && <span css={s.subBadge}>{it.subBadge}</span>}
                  </div>
                )}

                <div css={s.imageArea}>
                  <img css={s.image} src={it.img} alt={it.nameKo} />
                </div>

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
