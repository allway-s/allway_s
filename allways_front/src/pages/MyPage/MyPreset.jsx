/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPresetStyles.js';
import axios from 'axios';
import { createPost, getMyPresets, getPosts } from '../../apis/items/communityApi.js';
import { getItems, getSubwayPick } from "../../apis/items/menuApi"; 
import { getUserIdFromToken } from '../../utils/getUserId.js';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);
  const userId = getUserIdFromToken();

  // 2. 프리셋 목록 조회 (수정본)
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

      // 🔥 [핵심 추가] 각 프리셋의 상세 재료 정보를 서버에서 가져와서 합치기
      const enrichedWithIngredients = await Promise.all(
        presetData.map(async (preset) => {
          try {
            // 프리셋의 productId를 이용해 실제 재료 구성을 가져옴
            const detailRes = await getSubwayPick(preset.productId);
            const matchPost = communityPosts.find(post => Number(post.userId) === Number(preset.postedUserId));
            
            return {
              ...preset,
              // 서버에서 가져온 실제 재료 리스트를 주입
              ingredients: detailRes.data.ingredients, 
              authorNickname: matchPost ? matchPost.nickname : 
                              (Number(preset.postedUserId) === Number(userId) ? "나" : `User ${preset.postedUserId}`)
            };
          } catch (e) {
            return preset; // 에러 시 기본 데이터 유지
          }
        })
      );
      
      setPresets(enrichedWithIngredients);
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

// MyPreSet.js 내부의 handleOrder 함수를 아래와 같이 변경하세요.
// MenuPage의 getSubwayPick 로직을 그대로 가져와 연동합니다.
const handleOrder = async (item) => {
    try {
        // 1. 프리셋의 기반이 되는 상품 ID 추출
        const baseProductId = item.productId || item.product?.productId;
        
        if (!baseProductId) {
            alert("상품 정보를 불러올 수 없습니다.");
            return;
        }

        // 2. MenuPage처럼 서버에서 해당 구성의 상세 데이터(재료/가격)를 가져옴
        // 프리셋 상세 조회 API가 있다면 그것을 사용하고, 
        // 없다면 기반 상품의 기본 구성을 가져오는 getSubwayPick을 활용합니다.
        const response = await getSubwayPick(baseProductId); 
        const pickData = response.data;

        console.log('📦 프리셋 연동 데이터 확보:', pickData);

        // 3. CustomPage로 데이터 주입 (MenuPage와 동일 규격)
        navigate(`/custom/${baseProductId}`, {
            state: {
                category: item.product?.categoryName || "샌드위치",
                item: item.product || { itemId: baseProductId },
                isSubwayPick: true,
                subwayPickData: {
                    productId: pickData.productId,
                    ingredients: pickData.ingredients, // 이제 Array(0)이 아닌 데이터가 들어감
                    ingredientIds: pickData.ingredients.map(i => i.ingredientId),
                    ingredientNames: pickData.ingredients.map(i => i.ingredientName),
                    basePrice: pickData.totalPrice, // 합산 가격 전달 (0원 방지)
                }
            }
        });
    } catch (error) {
        console.error("❌ 프리셋 상세 데이터 로드 실패:", error);
        alert("레시피 정보를 불러오는 중 오류가 발생했습니다.");
    }
};

// 5. 공유 핸들러
  const handleShare = async (preset) => {
    // 프리셋에 연결된 상품 ID 확인
    const currentProductId = preset.productId || preset.product?.productId;
    
    if (!currentProductId) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      // 중복 공유 방지를 위해 전체 게시글 조회
      const communityRes = await getPosts();
      const communityPosts = communityRes.data || [];
      
      // 이미 같은 상품(레시피)으로 올라온 글이 있는지 체크
      const isAlreadyShared = communityPosts.some(post => 
        Number(post.productId) === Number(currentProductId)
      );
      
      if (isAlreadyShared) {
        alert("이미 커뮤니티에 공유된 레시피입니다.");
        return;
      }

      if (!window.confirm(`'${preset.presetName}' 레시피를 공유하시겠습니까?`)) return;
      
      /**
       * [작동 방식 설명]
       * 프론트: { presetId: 1 } 만 보냄
       * 백엔드: 토큰을 통해 PrincipalUser에서 userId를 꺼내 서비스의 createPost(userId, dto) 호출
       */
      const response = await createPost({ 
        presetId: preset.presetId 
      });

      if (response.status === 200 || response.status === 201) {
        alert("성공적으로 공유되었습니다!");
        navigate('/community');
      }
    } catch (error) {
      console.error("공유 에러:", error);
      alert("공유 처리 중 오류가 발생했습니다.");
    }
  };

  // 6. 삭제 핸들러
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

  // 7. 카드 렌더링
  const renderCard = (item, isSaved) => {
    const ingredients = item.ingredients || item.product?.ingredients || item.presetIngredients || [];
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
          {/* ✅ handleOrder 함수 연결 */}
          <button css={S.btnOrder} onClick={() => handleOrder(item)}>주문하기</button>
          <button css={S.btnDelete} onClick={() => handleDelete(item.presetId, item.postedUserId)}>삭제</button>
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
          <h2 >🛠️ 회원님의 오리지널 레시피</h2>
          <span>직접 주문하여 저장된 나만의 조합입니다.</span>
        </div>
        <div css={S.grid} style={{ marginBottom: '60px' }}>
          {myOriginals.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            myOriginals.map(item => renderCard(item, false))
          )}
        </div>

        <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
          <h2>📥 저장된 커뮤니티 레시피</h2>
          <span>다른 사용자의 꿀조합을 저장한 내역입니다.</span>
        </div>
        <div css={S.grid}>
          {savedPresets.length === 0 ? (
            <p>데이터가 없습니다.</p>
          ) : (
            savedPresets.map(item => renderCard(item, true))
          )}
        </div>
      </main>
    </div>
  );
}