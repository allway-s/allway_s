/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPresetStyles.js';
import axios from 'axios';
import { createPost, getMyPresets, getPosts } from '../../apis/items/communityApi.js';
import { productIngredient } from '../../apis/items/orderApi.js';
import { getUserIdFromToken } from '../../utils/getUserId.js';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const [presetRes, postRes] = await Promise.all([
          getMyPresets(),
          getPosts()
        ]);

        const presetData = presetRes.data || [];
        const communityPosts = postRes.data || [];

        console.log('📦 받은 프리셋 데이터:', presetData);

        // ✅ 각 프리셋의 상세 재료 정보 가져오기
        const enrichedWithIngredients = await Promise.all(
          presetData.map(async (preset) => {
            try {
              const detailRes = await productIngredient(preset.productId);
              const matchPost = communityPosts.find(
                post => Number(post.userId) === Number(preset.postedUserId)
              );
              
              console.log(`✅ 프리셋 ${preset.presetId} 재료:`, detailRes.data);

              const ingredients = detailRes.data.ingredients || [];
              
              // ✅ 실제 주문 가격 = 샌드위치 기본가 + 추가 재료
              const additionalPrice = ingredients.reduce((sum, ing) => {
                return sum + (ing.price > 0 ? ing.price : 0);
              }, 0);
              
              const basePrice = preset.itemPrice || 0;  // DB에서 가져온 item 가격
              const totalPrice = basePrice + additionalPrice;

              const displayImage = preset.imageUrl || "/default-subway.png";

              return {
                ...preset,
                ingredients: ingredients,
                imgUrl: displayImage,
                totalPrice: totalPrice,  // ✅ 기본가 + 추가재료
                itemId: detailRes.data.itemId,
                authorNickname: matchPost 
                  ? matchPost.nickname 
                  : (Number(preset.postedUserId) === Number(userId) ? "나" : preset.nickname || `User ${preset.postedUserId}`)
              };
            } catch (e) {
              console.error(`❌ 프리셋 ${preset.presetId} 조회 실패:`, e);
              return {
                ...preset,
                ingredients: [],
                imgUrl: preset.imageUrl || "/default-subway.png",
                totalPrice: preset.itemPrice || 0,
                itemId: null,
                authorNickname: Number(preset.postedUserId) === Number(userId) ? "나" : preset.nickname || `User ${preset.postedUserId}`
              };
            }
          })
        );
        
        console.log('✨ 최종 프리셋 데이터:', enrichedWithIngredients);
        setPresets(enrichedWithIngredients);
      } catch (error) {
        console.error("❌ 데이터 로드 실패:", error);
        alert('프리셋을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId, navigate]);

  // 분류 로직
  const myOriginals = useMemo(() => {
    return presets.filter(p => Number(p.userId) === Number(p.postedUserId)); 
  }, [presets]);

  const savedPresets = useMemo(() => {
    return presets.filter(p => Number(p.userId) !== Number(p.postedUserId)); 
  }, [presets]);

  // ✅ 주문하기 핸들러
  const handleOrder = async (item) => {
    try {
      if (!item.productId) {
        alert("상품 정보를 불러올 수 없습니다.");
        return;
      }

      console.log('📦 프리셋 주문하기:', item);

      const targetItemId = item.itemId || item.productId;

      navigate(`/custom/${targetItemId}`, {
        state: {
          category: "샌드위치",
          item: {
            itemId: targetItemId,
            itemName: item.presetName,
            imageUrl: item.imgUrl
          },
          isSubwayPick: true,
          subwayPickData: {
            productId: item.productId,
            ingredients: item.ingredients || [],
            ingredientIds: (item.ingredients || []).map(i => i.ingredientId),
            ingredientNames: (item.ingredients || []).map(i => i.ingredientName),
            basePrice: item.totalPrice || 0,
          }
        }
      });
    } catch (error) {
      console.error("❌ 프리셋 주문 처리 실패:", error);
      alert("주문 처리 중 오류가 발생했습니다.");
    }
  };

  // 공유 핸들러
  const handleShare = async (preset) => {
    const currentProductId = preset.productId;
    
    if (!currentProductId) {
      alert("상품 정보를 찾을 수 없습니다.");
      return;
    }

    try {
      const communityRes = await getPosts();
      const communityPosts = communityRes.data || [];
      
      const isAlreadyShared = communityPosts.some(post => 
        Number(post.productId) === Number(currentProductId)
      );
      
      if (isAlreadyShared) {
        alert("이미 커뮤니티에 공유된 레시피입니다.");
        return;
      }

      if (!window.confirm(`'${preset.presetName}' 레시피를 공유하시겠습니까?`)) return;
      
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

  // 삭제 핸들러
  const handleDelete = async (presetId, postedUserId) => {
    const isSavedRecipe = Number(userId) !== Number(postedUserId);
    let confirmMsg = isSavedRecipe 
      ? `[저장된 레시피 삭제]\n내 목록에서만 삭제됩니다.` 
      : `[오리지널 레시피 삭제]\n삭제 시 커뮤니티 게시글도 함께 삭제됩니다. 정말 삭제하시겠습니까?`;
    
    if (!window.confirm(confirmMsg)) return;
    
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(`/api/presets/${presetId}`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.status === 200 || response.status === 204) {
        alert("성공적으로 삭제되었습니다.");
        setPresets(prev => prev.filter(p => p.presetId !== presetId));
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  // 카드 렌더링
  const renderCard = (item, isSaved) => {
    const ingredients = item.ingredients || [];
    const ingredientText = ingredients.length > 0 
      ? ingredients.map(i => i.ingredientName).join(", ") 
      : "선택된 재료가 없습니다.";

    const isOriginal = !isSaved;
    const displayImg = item.imgUrl || "/default-subway.png";

    return (
      <div key={item.presetId} css={S.card} style={{ padding: '20px' }}>
        <div css={S.imageArea} style={{ marginBottom: '15px' }}>
          <img 
            src={displayImg} 
            alt={item.presetName} 
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
            onError={(e) => {
              console.error(`이미지 로드 실패: ${displayImg}`);
              e.target.src = '/default-subway.png';
            }}
          />
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
          {/* ✅ 실제 주문 가격 표시 */}
          {item.totalPrice > 0 && (
            <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#009223', margin: '5px 0' }}>
              총 {item.totalPrice.toLocaleString()}원
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
          textAlign: 'left',
          minHeight: '80px'
        }}>
          <strong style={{ color: '#009223', display: 'block', marginBottom: '4px' }}>재료 조합:</strong>
          {ingredientText}
        </div>

        <div css={S.buttonGroup} style={{ marginTop: 'auto' }}>
          {isOriginal && <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>}
          <button css={S.btnOrder} onClick={() => handleOrder(item)}>주문하기</button>
          <button css={S.btnDelete} onClick={() => handleDelete(item.presetId, item.postedUserId)}>삭제</button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div css={S.wrapper}>
        <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
          프리셋을 불러오는 중...
        </div>
      </div>
    );
  }

  return (
    <div css={S.wrapper}>
      <section css={S.titleSection}>
        <div css={S.titleContainer}>
          <h1 css={S.mainTitle}>My <span css={S.yellowText}>PreSet</span></h1>
        </div>
      </section>

      <main css={S.container}>
        <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
          <h2>🛠️ 회원님의 오리지널 레시피</h2>
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