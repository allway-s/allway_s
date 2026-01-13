/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPreset.styles.js';
import { MOCK_PRESETS } from '../MainPage/constants.js';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);

  useEffect(() => {
    setPresets(MOCK_PRESETS);
  }, []);

  return (
    <div css={S.wrapper}>
      {/* 1. 상단 네비게이션 바 */}
      <header css={S.header}>
            <div css={S.headerInner}>
                {/* 로고를 왼쪽 끝으로 배치 */}
                <div css={S.logoArea} onClick={() => navigate('/')}>
                    <span css={S.logoText}>ALLWAY-<span style={{color: '#ffc107'}}>S</span></span>
                </div>
                
                {/* 메뉴를 오른쪽 끝으로 배치 */}
                <div css={S.navMenu}>
                    <button onClick={() => navigate('/cart')}>장바구니</button>
                    <button css={S.activeMenu} onClick={() => navigate('/mypage')}>마이페이지</button>
                    <button>로그아웃</button>
                </div>
            </div>
        </header>

      {/* 2. 타이틀 영역 (가로지르는 노란 선 포함) */}
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>My <span css={S.yellowText}>PreSet</span></h1>
        </div>
      </section>

      {/* 3. 프리셋 카드 그리드 */}
      <main css={S.container}>
        <div css={S.grid}>
          {presets.map((item) => (
            <div key={item.id} css={S.card}>
              <div css={S.imageArea}>
                <img src={item.image} alt={item.name} />
              </div>
              
              <h3 css={S.presetName}>{item.name}</h3>

              <ul css={S.infoList}>
                <li><span css={S.badge}>빵</span>{item.ingredients.bread}</li>
                <li><span css={S.badge}>치즈</span>{item.ingredients.cheese}</li>
                <li><span css={S.badge}>야채</span>{item.ingredients.veggies}</li>
                <li><span css={S.badge}>소스</span>{item.ingredients.sauce}</li>
              </ul>

              <div css={S.buttonGroup}>
                <button css={S.btnAction}>공유</button>
                <button css={S.btnAction}>수정</button>
                <button css={S.btnOrder}>주문</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}