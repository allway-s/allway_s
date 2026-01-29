/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPresetStyles.js';
import axios from 'axios';
import { createPost, deletePreset, getMyPresets, getPosts } from '../../apis/items/communityApi.js';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);

  // 1. 토큰에서 내 userId 추출
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const decoded = JSON.parse(jsonPayload);
      return Number(decoded.userId || decoded.id || decoded.sub);
    } catch (e) { return null; }
  };

  const userId = getUserIdFromToken();

  // 2. 프리셋 목록 조회 및 진단
  useEffect(() => {
    const checkData = async () => {
      if (!userId) return;
      try {
        const response = getMyPresets(userId);
        const data = response.data || [];
        
        console.log("=== 🔍 데이터 정밀 진단 시작 ===");
        const diagnosticTable = data.map(p => ({
          ID: p.presetId,
          이름: p.presetName,
          내ID와일치: Number(p.userId) === Number(userId),
          'by텍스트포함': p.presetName.includes("(by ")
        }));
        console.table(diagnosticTable); 
        
        setPresets(data);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    checkData();
  }, [userId]);

  // 3. 분류 로직
  const myOriginals = useMemo(() => {
    return presets.filter(p => !p.presetName.includes("(by ")); 
  }, [presets]);

  const savedPresets = useMemo(() => {
    return presets.filter(p => p.presetName.includes("(by ")); 
  }, [presets]);

  
  // 4. 공유 핸들러 (수정 완료)
const handleShare = async (preset) => {
  // 1. 현재 공유하려는 프리셋의 productId 추출
  // 데이터 구조에 따라 preset.productId 혹은 preset.product.productId일 수 있습니다.
  const currentProductId = preset.productId || preset.product?.productId;

  if (!currentProductId) {
    alert("상품 정보를 찾을 수 없어 공유할 수 없습니다.");
    return;
  }

  try {
    // 2. [사전 검사] 커뮤니티에 이미 동일한 productId를 가진 게시글이 있는지 확인
    const communityRes = getPosts();
    const communityPosts = communityRes.data || [];

    // DB의 product_id와 현재 프리셋의 productId를 비교
    const isAlreadyShared = communityPosts.some(post => 
      Number(post.productId) === Number(currentProductId)
    );

    if (isAlreadyShared) {
      alert("이미 동일한 상품 구성의 레시피가 커뮤니티에 공유되어 있습니다.\n(다른 조합으로 나만의 레시피를 만들어보세요!)");
      return;
    }

    // 3. 중복이 아니라면 공유 진행
    if (!window.confirm(`'${preset.presetName}' 레시피를 커뮤니티에 공유하시겠습니까?`)) return;

    const token = localStorage.getItem("accessToken");
    const response = await axios.post(createPost(),
      { presetId: preset.presetId }, // 서버 규격에 맞게 ID 전달
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200 || response.status === 201) {
      alert("커뮤니티에 성공적으로 공유되었습니다!");
      navigate('/community');
    }
  } catch (error) {
    console.error("공유 처리 중 에러:", error);
    if (error.response?.status === 401) {
      alert("세션이 만료되었거나 공유 권한이 없습니다.");
    } else {
      alert("공유 중 오류가 발생했습니다.");
    }
  }
};


  // 5. 삭제 핸들러
  const handleDelete = async (presetId, presetName) => {
    const isScrapped = presetName.includes("(by ");
    
    let confirmMsg = isScrapped 
      ? `[저장된 레시피 삭제]\n내 목록에서만 삭제되며, 원본 게시글에는 영향을 주지 않습니다.` 
      : `[오리지널 레시피 삭제]\n회원님이 만드신 레시피입니다.\n삭제 시 커뮤니티에 공유된 게시글도 '함께 삭제' 됩니다. 정말 삭제하시겠습니까?`;

    if (!window.confirm(confirmMsg)) return;

    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(deletePreset(), {
        params: { userId: userId }, 
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200 || response.status === 204) {
        alert("성공적으로 삭제되었습니다.");
        setPresets(prev => prev.filter(p => p.presetId !== presetId));
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 403) alert("삭제 권한이 없습니다.");
      else if (status === 404) alert("이미 삭제된 데이터입니다.");
      else alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  // 6. 카드 렌더링 함수
  const renderCard = (item, isSaved) => {
    const ingredients = item.product?.ingredients || [];
    const getIng = (catId) => ingredients.find(i => i.ingredientCategoryId === catId)?.ingredientName || "선택안함";
    const isOriginal = !isSaved;

    return (
      <div key={item.presetId} css={S.card}>
        <div css={S.imageArea}>
          <img src={item.imgUrl || "/default-subway.png"} alt={item.presetName} />
          {isSaved && <div style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#009223', color: 'white', padding: '2px 6px', fontSize: '10px', borderRadius: '4px' }}>SAVED</div>}
        </div>
        <h3 css={S.presetName}>{item.presetName}</h3>
        <ul css={S.infoList}>
          <li><span css={S.badge}>빵</span> {getIng(1)}</li>
          <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
          <li><span css={S.badge}>소스</span> {getIng(4)}</li>
        </ul>
        <div css={S.buttonGroup}>
          {isOriginal && (
            <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>
          )}
          <button css={S.btnOrder} onClick={() => navigate('/menu')}>주문</button>
          <button css={S.btnDelete} onClick={() => handleDelete(item.presetId, item.presetName)}>삭제</button>
        </div>
      </div>
    );
  };

  return (
    <div css={S.wrapper}>
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>My <span css={S.yellowText}>PreSet</span></h1>
        </div>
      </section>

      <main css={S.container}>
        <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#ffce32' }}>🛠️ 회원님의 오리지널 레시피</h2>
          <span style={{ color: '#1de5a9' }}>직접 주문하여 내 프리셋에 저장된 나만의 조합입니다.</span>
        </div>
        <div css={S.grid} style={{ marginBottom: '60px' }}>
          {myOriginals.length === 0 ? (
            <p style={{ color: '#aaa', gridColumn: '1/-1' }}>등록된 오리지널 레시피가 없습니다.</p>
          ) : (
            myOriginals.map(item => renderCard(item, false)) 
          )}
        </div>

        <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#009223' }}>📥 저장된 커뮤니티 레시피</h2>
          <span style={{ color: '#2ff5d0' }}>다른 사용자의 꿀조합을 저장한 내역입니다.</span>
        </div>
        <div css={S.grid}>
          {savedPresets.length === 0 ? (
            <p style={{ color: '#aaa', gridColumn: '1/-1' }}>커뮤니티에서 저장한 레시피가 없습니다.</p>
          ) : (
            savedPresets.map(item => renderCard(item, true))
          )}
        </div>
      </main>
    </div>
  );
}


