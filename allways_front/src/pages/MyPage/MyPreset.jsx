/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPresetStyles.js';
import axios from 'axios';
import { createPost, getMyPresets, getPosts } from '../../apis/items/communityApi.js';

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

  // 2. 프리셋 목록 조회
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const [presetRes, postRes] = await Promise.all([
          getMyPresets(userId),
          getPosts()
        ]);

        const presetData = presetRes.data || [];
        const communityPosts = postRes.data || [];

        const enrichedData = presetData.map(preset => {
          const matchPost = communityPosts.find(post => Number(post.userId) === Number(preset.postedUserId));
          return {
            ...preset,
            authorNickname: matchPost ? matchPost.nickname : 
                            (Number(preset.postedUserId) === Number(userId) ? "나" : `User ${preset.postedUserId}`)
          };
        });
        
        setPresets(enrichedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchData();
  }, [userId]);

  // 3. 분류 로직
  const myOriginals = useMemo(() => {
    return presets.filter(p => Number(p.userId) === Number(p.postedUserId)); 
  }, [presets, userId]);

  const savedPresets = useMemo(() => {
    return presets.filter(p => Number(p.userId) !== Number(p.postedUserId)); 
  }, [presets, userId]);

  // 4. 공유 핸들러
  const handleShare = async (preset) => {
    const currentProductId = preset.productId || preset.product?.productId;
    if (!currentProductId) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }
    try {
      const communityRes = await getPosts();
      const communityPosts = communityRes.data || [];
      const isAlreadyShared = communityPosts.some(post => Number(post.productId) === Number(currentProductId));
      
      if (isAlreadyShared) {
        alert("이미 커뮤니티에 공유된 레시피입니다.");
        return;
      }
      if (!window.confirm(`'${preset.presetName}' 레시피를 공유하시겠습니까?`)) return;
      
      const response = await createPost({ presetId: preset.presetId });
      if (response.status === 200 || response.status === 201) {
        alert("성공적으로 공유되었습니다!");
        navigate('/community');
      }
    } catch (error) {
      alert("공유 처리 중 오류가 발생했습니다.");
    }
  };

  // 5. 삭제 핸들러
  const handleDelete = async (presetId, postedUserId) => {
    const isSavedRecipe = Number(userId) !== Number(postedUserId);
    let confirmMsg = isSavedRecipe 
      ? `[저장된 레시피 삭제]\n내 목록에서만 삭제됩니다.` 
      : `[오리지널 레시피 삭제]\n삭제 시 커뮤니티 게시글도 함께 삭제됩니다. 정말 삭제하시겠습니까?`;
    
    if (!window.confirm(confirmMsg)) return;
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/presets/${presetId}`, { 
        params: { userId: userId }, 
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200 || response.status === 204) {
        alert("성공적으로 삭제되었습니다.");
        setPresets(prev => prev.filter(p => p.presetId !== presetId));
      }
    } catch (error) {
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

// 6. 카드 렌더링 수정 (장바구니 스타일: 재료를 한 줄로 나열)
  const renderCard = (item, isSaved) => {
    // 1) 재료 데이터 추출 (DB의 ingredient_name들을 모음)
    const ingredients = item.ingredients || item.product?.ingredients || [];
    const ingredientText = ingredients.length > 0 
      ? ingredients.map(i => i.ingredientName).join(", ") 
      : "선택된 재료가 없습니다.";

    const isOriginal = !isSaved;
    const displayImg = item.imgUrl || item.product?.imageUrl || "/default-subway.png";

    return (
      <div key={item.presetId} css={S.card} style={{ padding: '20px' }}>
        <div css={S.imageArea} style={{ marginBottom: '15px' }}>
          <img src={displayImg} alt={item.presetName} style={{ width: '100%', borderRadius: '8px' }} />
        </div>
        
        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
          <h3 css={S.presetName} style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '5px' }}>
            {item.presetName}
          </h3>
          {!isOriginal && (
            <p style={{ fontSize: '13px', color: '#888', margin: '0 0 10px 0' }}>
              작성자: <span style={{ color: '#009223', fontWeight: 'bold' }}>{item.authorNickname}</span>
            </p>
          )}
        </div>

        {/* ✅ 장바구니 스타일 재료 노출 영역 */}
        <div style={{ 
          backgroundColor: '#f8f8f8', 
          padding: '12px', 
          borderRadius: '6px', 
          fontSize: '14px', 
          lineHeight: '1.5',
          color: '#444',
          marginBottom: '15px',
          textAlign: 'left'
        }}>
          <strong style={{ color: '#009223', display: 'block', marginBottom: '4px' }}>재료 조합:</strong>
          {ingredientText}
        </div>

        <div css={S.buttonGroup} style={{ marginTop: 'auto' }}>
          {isOriginal && <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>}
          <button css={S.btnOrder} onClick={() => navigate('/menu')}>주문하기</button>
          <button css={S.btnDelete} onClick={() => handleDelete(item.presetId, item.postedUserId)}>삭제</button>
        </div>
      </div>
    );
  };

  // 🌟 [추가] 실제 화면을 렌더링하는 Return문
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
          <span style={{ color: '#1de5a9' }}>직접 주문하여 저장된 나만의 조합입니다.</span>
        </div>
        <div css={S.grid} style={{ marginBottom: '60px' }}>
          {myOriginals.length === 0 ? (
            <p style={{ color: '#aaa', gridColumn: '1/-1' }}>데이터가 없습니다.</p>
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
            <p style={{ color: '#aaa', gridColumn: '1/-1' }}>데이터가 없습니다.</p>
          ) : (
            savedPresets.map(item => renderCard(item, true))
          )}
        </div>
      </main>
    </div>
  );
}

//   // 6. 카드 렌더링 (유지)
//   const renderCard = (item, isSaved) => {
//     const ingredients = item.product?.ingredients || [];
//     const getIng = (catId) => ingredients.find(i => i.ingredientCategoryId === catId)?.ingredientName || "선택안함";
//     const isOriginal = !isSaved;

//     return (
//       <div key={item.presetId} css={S.card}>
//         <div css={S.imageArea}>
//           <img src={item.imgUrl || "/default-subway.png"} alt={item.presetName} />
//           {isSaved && <div style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#009223', color: 'white', padding: '2px 6px', fontSize: '10px', borderRadius: '4px' }}>SAVED</div>}
//         </div>
        
//         <div style={{ padding: '0 4px', marginBottom: '8px' }}>
//           <h3 css={S.presetName} style={{ display: 'inline' }}>{item.presetName}</h3>
//           {/* ✅ [수정] 오리지널이 아닐 때만 'by 원작자닉네임' 표시 */}
//           {!isOriginal && (
//             <span style={{ fontSize: '12px', color: '#888', marginLeft: '5px' }}>
//               by {item.authorNickname}
//             </span>
//           )}
//         </div>

//         <ul css={S.infoList}>
//           <li><span css={S.badge}>빵</span> {getIng(1)}</li>
//           <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
//           <li><span css={S.badge}>소스</span> {getIng(4)}</li>
//         </ul>
//         <div css={S.buttonGroup}>
//           {isOriginal && (
//             <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>
//           )}
//           <button css={S.btnOrder} onClick={() => navigate('/menu')}>주문</button>
//           <button css={S.btnDelete} onClick={() => handleDelete(item.presetId, item.postedUserId)}>삭제</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div css={S.wrapper}>
//       <section css={S.titleSection}>
//         <div css={S.titleContainer}>
//           <h1 css={S.mainTitle}>My <span css={S.yellowText}>PreSet</span></h1>
//         </div>
//       </section>

//       <main css={S.container}>
//         <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
//           <h2 style={{ color: '#ffce32' }}>🛠️ 회원님의 오리지널 레시피</h2>
//           <span style={{ color: '#1de5a9' }}>직접 주문하여 저장된 나만의 조합입니다.</span>
//         </div>
//         <div css={S.grid} style={{ marginBottom: '60px' }}>
//           {myOriginals.length === 0 ? (
//             <p style={{ color: '#aaa', gridColumn: '1/-1' }}>데이터가 없습니다.</p>
//           ) : (
//             myOriginals.map(item => renderCard(item, false))
//           )}
//         </div>

//         <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
//           <h2 style={{ color: '#009223' }}>📥 저장된 커뮤니티 레시피</h2>
//           <span style={{ color: '#2ff5d0' }}>다른 사용자의 꿀조합을 저장한 내역입니다.</span>
//         </div>
//         <div css={S.grid}>
//           {savedPresets.length === 0 ? (
//             <p style={{ color: '#aaa', gridColumn: '1/-1' }}>데이터가 없습니다.</p>
//           ) : (
//             savedPresets.map(item => renderCard(item, true))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

