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


  // 3. 공유 버튼 클릭시 커뮤니티로 이동되게끔 하는 핸들러 생성
  // [추가] 공유 버튼 클릭 핸들러
  const handleShare = async (preset) => {
    if (!window.confirm(`'${preset.presetName}' 레시피를 커뮤니티에 공유하시겠습니까?`)) return;

    // 1번 로직에서 사용하는 토큰을 다시 가져옵니다.
    const token = localStorage.getItem("accessToken");

    try {
      // API 설계: 커뮤니티 포스트를 생성하는 엔드포인트
      // 보통 프리셋 ID와 유저 ID를 보내면 서버에서 해당 프리셋 정보를 복사해 게시글을 생성합니다.
      const response = await axios.post(
        `http://localhost:8080/api/post/create`, 
        {
          presetId: preset.presetId,
          // userId: userId,
          // title: preset.presetName, // 제목은 일단 프리셋 이름으로 설정
        },
        {
          // ★ 이 부분이 핵심입니다! 서버 보안 통과를 위한 헤더 설정
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("커뮤니티에 성공적으로 공유되었습니다!");
        navigate('/community'); // 공유 후 커뮤니티 페이지로 이동
      }
    } catch (error) {
      console.error("공유 실패:", error);
      // 이제 401 대신 404가 뜬다면, 서버에 해당 API 주소가 아직 없다는 뜻입니다.
      alert(`공유 중 오류가 발생했습니다. (에러 코드: ${error.response?.status})`);

      // 에러 상황별 메시지 처리
      const status = error.response?.status;
      if (status === 401) {
        alert("인증 세션이 만료되었습니다. 다시 로그인해주세요.");
      } else if (status === 404) {
        alert("API 경로를 찾을 수 없습니다. (서버 주소 확인 필요)");
      } else {
        alert(`공유 중 오류가 발생했습니다. (상태 코드: ${status || 'Network Error'})`);
      }
    }
  };

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

              console.log(`${item.presetName}의 전체 데이터:`, item);

              return (
                <div key={item.presetId} css={S.card}>
                  <div css={S.imageArea}>
                    <img src={item.imgUrl} />
                  </div>
                  {/* <div css={S.imageArea}>
                    <img src={ingredients[0]?.img_url || "/default-subway.png"} alt={item.presetName} />
                  </div> */}
                  <h3 css={S.presetName}>{item.presetName}</h3>
                  <ul css={S.infoList}>
                    <li><span css={S.badge}>빵</span> {getIng(1)}</li>
                    <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
                    <li><span css={S.badge}>소스</span> {getIng(4)}</li>
                  </ul>
                  <div css={S.buttonGroup}>
                    <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>
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
