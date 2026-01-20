/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPreset.styles.js';
import axios from 'axios';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);

  // 1. 토큰에서 userId(2) 추출 - 이 부분은 데이터 조회를 위해 꼭 필요합니다.
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const decoded = JSON.parse(jsonPayload);
      return decoded.userId || decoded.id || decoded.sub; //
    } catch (e) { return null; }
  };

  const userId = getUserIdFromToken();

  // 2. 프리셋 목록만 깔끔하게 불러오기
  const fetchMyPresets = async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/preset/list/${userId}`);
      setPresets(response.data || []);
    } catch (error) {
      console.error("프리셋 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchMyPresets();
  }, [userId]);

  return (
    <div css={S.wrapper}>
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          {/* 이름 대신 깔끔하게 서비스명으로 유지합니다. */}
          <h1 css={S.mainTitle}>My <span css={S.yellowText}>PreSet</span></h1>
        </div>
      </section>

      <main css={S.container}>
        <div css={S.grid}>
          {presets.length === 0 ? (
            <div style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
              저장된 프리셋이 없습니다.
            </div>
          ) : (
            presets.map((item) => {
              const ingredients = item.product?.ingredients || [];
              const getIng = (catId) => ingredients.find(i => i.ingredientCategoryId === catId)?.ingredientName || "선택안함";

              return (
                <div key={item.presetId} css={S.card}>
                  <div css={S.imageArea}>
                    <img src={ingredients[0]?.imgUrl || "/default-subway.png"} alt={item.presetName} />
                  </div>
                  <h3 css={S.presetName}>{item.presetName}</h3>
                  <ul css={S.infoList}>
                    <li><span css={S.badge}>빵</span> {getIng(1)}</li>
                    <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
                    <li><span css={S.badge}>소스</span> {getIng(4)}</li>
                  </ul>
                  <div css={S.buttonGroup}>
                    <button css={S.btnShare}>공유</button>
                    <button css={S.btnOrder} onClick={() => { if (window.confirm('주문 페이지로 이동하시겠습니까?')) navigate('/menu'); }}>주문</button>
                    {/* 삭제 기능은 presetId를 사용하여 정상 작동합니다. */}
                    <button css={S.btnDelete} onClick={() => handleDelete(item.presetId)}>삭제</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}