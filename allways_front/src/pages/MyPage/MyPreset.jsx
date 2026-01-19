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
                <button css={S.btnShare}>공유</button>
                
                <button 
                  css={S.btnOrder}
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 카드(프리셋 관리)로 이동하는 이벤트 전파 방지
                                    
                    // confirm 창은 확인을 누르면 true, 취소를 누르면 false를 반환합니다.
                    const isConfirmed = window.confirm('해당 구성으로 주문 페이지로 이동하시겠습니까?');
                                    
                    if (isConfirmed) {
                      navigate('/menu'); // 확인을 눌렀을 때만 이동 (실제 주문 경로로 수정하세요)
                      }
                    }}
                >
                  주문
                </button>
                <button css={S.btnDelete}>삭제</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}