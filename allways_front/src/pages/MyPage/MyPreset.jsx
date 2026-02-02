/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPresetStyles.js';
import axios from 'axios';
import { createPost, getMyPresets, getPosts } from '../../apis/items/communityApi.js';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);

  // 1. 토큰에서 내 userId 추출 (유지)
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      const decoded = JSON.parse(jsonPayload);
      // ✅ 서버 데이터와 비교를 위해 Number 타입 변환 보장
      return Number(decoded.userId || decoded.id || decoded.sub);
    } catch (e) { return null; }
  };

  const userId = getUserIdFromToken();

  // 2. 프리셋 목록 조회 (닉네임 매칭 로직 강화)
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

        // ✅ [수정] 닉네임 매칭 로직: 현재 로그인한 userId와 상관없이 'postedUserId'를 기준으로 원작자를 찾습니다.
        const enrichedData = presetData.map(preset => {
          // 커뮤니티 게시글에서 이 프리셋의 원작자(postedUserId)와 일치하는 게시물을 찾음
          const matchPost = communityPosts.find(post => Number(post.userId) === Number(preset.postedUserId));
          
          return {
            ...preset,
            // ✅ [수정] 닉네임 결정 우선순위
            // 1. 커뮤니티에 원작자 닉네임이 있다면 그것을 사용
            // 2. 없다면, 내가 원작자일 경우 "나"라고 표시
            // 3. 둘 다 아니면 시스템상의 User ID 표시
            authorNickname: matchPost ? matchPost.nickname : 
                            (Number(preset.postedUserId) === Number(userId) ? "나" : `User ${preset.postedUserId}`)
          };
        });
        
        console.log("=== 🔍 데이터 정밀 진단 (로그인 ID: " + userId + ") ===");
        console.table(enrichedData.map(p => ({
          ID: p.presetId,
          이름: p.presetName,
          소유자ID: p.userId,
          원작자ID: p.postedUserId,
          최종닉네임: p.authorNickname
        })));
        
        setPresets(enrichedData);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchData();
  }, [userId]); // ✅ userId가 바뀔 때마다(로그인 유저가 바뀔 때마다) 다시 로드

  // 3. ✅ [수정] 분류 로직: 현재 로그인한 사람(userId)이 원작자(postedUserId)인지만 확인하면 됩니다.
  const myOriginals = useMemo(() => {
    // 내가 소유하고 있고, 내가 만든 것
    return presets.filter(p => Number(p.userId) === Number(p.postedUserId)); 
  }, [presets, userId]);

  const savedPresets = useMemo(() => {
    // 내가 소유하고 있지만, 만든 사람은 남인 것
    return presets.filter(p => Number(p.userId) !== Number(p.postedUserId)); 
  }, [presets, userId]);

  // 4. 공유 핸들러 (유지)
  const handleShare = async (preset) => {
    const currentProductId = preset.productId || preset.product?.productId;
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
      const response = await createPost({ presetId: preset.presetId });
      if (response.status === 200 || response.status === 201) {
        alert("성공적으로 공유되었습니다!");
        navigate('/community');
      }
    } catch (error) {
      alert("공유 처리 중 오류가 발생했습니다.");
    }
  };

  // 5. 삭제 핸들러 (유지)
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

  // 6. 카드 렌더링 (유지)
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
        
        <div style={{ padding: '0 4px', marginBottom: '8px' }}>
          <h3 css={S.presetName} style={{ display: 'inline' }}>{item.presetName}</h3>
          {/* ✅ [수정] 오리지널이 아닐 때만 'by 원작자닉네임' 표시 */}
          {!isOriginal && (
            <span style={{ fontSize: '12px', color: '#888', marginLeft: '5px' }}>
              by {item.authorNickname}
            </span>
          )}
        </div>

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


// /** @jsxImportSource @emotion/react */
// import React, { useState, useEffect, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { S } from './MyPresetStyles.js';
// import axios from 'axios';
// import { createPost, deletePreset, getMyPresets, getPosts } from '../../apis/items/communityApi.js';

// export default function MyPreSet() {
//   const navigate = useNavigate();
//   const [presets, setPresets] = useState([]);

//   // 1. 토큰에서 내 userId 추출
//   const getUserIdFromToken = () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return null;
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
//       const decoded = JSON.parse(jsonPayload);
//       return Number(decoded.userId || decoded.id || decoded.sub);
//     } catch (e) { return null; }
//   };

//   const userId = getUserIdFromToken();

//   // 2. 프리셋 목록 조회 및 진단
//   useEffect(() => {
//     const checkData = async () => {
//       if (!userId) return;
//       try {
//         // 수정 후 (async/await 적용)
//         const response = await getMyPresets(userId); // 실제 데이터를 받아올 때까지 대기
//         const data = response.data || [];
        
//         console.log("=== 🔍 데이터 정밀 진단 시작 ===");
//         const diagnosticTable = data.map(p => ({
//           ID: p.presetId,
//           이름: p.presetName,
//           내ID와일치: Number(p.userId) === Number(userId),
//           'by텍스트포함': p.presetName.includes("(by ")
//         }));
//         console.table(diagnosticTable); 
        
//         setPresets(data);
//       } catch (error) {
//         console.error("데이터 로드 실패:", error);
//       }
//     };
//     checkData();
//   }, [userId]);

// // 3. 분류 로직 수정
// // 3. ✅ 분류 로직 수정 (문자열 기준 대신 ID 비교로 변경)
//   const myOriginals = useMemo(() => {
//     return presets.filter(p => Number(p.userId) === Number(p.postedUserId)); 
//   }, [presets, userId]);

//   const savedPresets = useMemo(() => {
//     return presets.filter(p => Number(p.userId) !== Number(p.postedUserId)); 
//   }, [presets, userId]);

  
//   // 4. 공유 핸들러 (수정 완료)
// const handleShare = async (preset) => {
//   // 1. 현재 공유하려는 프리셋의 productId 추출
//   // 데이터 구조에 따라 preset.productId 혹은 preset.product.productId일 수 있습니다.
//   const currentProductId = preset.productId || preset.product?.productId;

//   if (!currentProductId) {
//     alert("상품 정보를 찾을 수 없어 공유할 수 없습니다.");
//     return;
//   }

//   try {
//     // 2. [사전 검사] 커뮤니티에 이미 동일한 productId를 가진 게시글이 있는지 확인
//     const communityRes = await getPosts();
//     const communityPosts = communityRes.data || [];

//     // DB의 product_id와 현재 프리셋의 productId를 비교
//     const isAlreadyShared = communityPosts.some(post => 
//       Number(post.productId) === Number(currentProductId)
//     );

//     if (isAlreadyShared) {
//       alert("이미 동일한 상품 구성의 레시피가 커뮤니티에 공유되어 있습니다.\n(다른 조합으로 나만의 레시피를 만들어보세요!)");
//       return;
//     }

//     // 3. 중복이 아니라면 공유 진행
//     if (!window.confirm(`'${preset.presetName}' 레시피를 커뮤니티에 공유하시겠습니까?`)) return;

//     const token = localStorage.getItem("accessToken");
//     const response = await createPost({ presetId: preset.presetId });

//     if (response.status === 200 || response.status === 201) {
//       alert("커뮤니티에 성공적으로 공유되었습니다!");
//       navigate('/community');
//     }
//   } catch (error) {
//     console.error("공유 처리 중 에러:", error);
//     if (error.response?.status === 401) {
//       alert("세션이 만료되었거나 공유 권한이 없습니다.");
//     } else {
//       // 여기서 error.response를 출력해보면 더 정확한 원인을 알 수 있습니다.
//       console.error("공유 API 호출 에러 상세:", error.response);
//       alert("공유 중 오류가 발생했습니다.");
//     }
//   }
// };


//   // 5. 삭제 핸들러 (ID 비교 방식으로 수정)
//   const handleDelete = async (presetId, postedUserId) => {
//     // 💡 수정한 부분: 문자열이 아닌 ID 숫자로 내 것인지 남의 것인지 판단
//     const isSavedRecipe = Number(userId) !== Number(postedUserId);
    
//     let confirmMsg = isSavedRecipe 
//       ? `[저장된 레시피 삭제]\n내 목록에서만 삭제되며, 원본 게시글에는 영향을 주지 않습니다.` 
//       : `[오리지널 레시피 삭제]\n회원님이 만드신 레시피입니다.\n삭제 시 커뮤니티에 공유된 게시글도 '함께 삭제' 됩니다. 정말 삭제하시겠습니까?`;

//     if (!window.confirm(confirmMsg)) return;

//     const token = localStorage.getItem("accessToken");

//     try {
//       // API 호출 시 userId를 쿼리 파라미터로 전송 (기존 유지)
//       const response = await axios.delete(`/api/presets/${presetId}`, { 
//         params: { userId: userId }, 
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       if (response.status === 200 || response.status === 204) {
//         alert("성공적으로 삭제되었습니다.");
//         // 상태 업데이트로 화면에서 즉시 제거 (기존 유지)
//         setPresets(prev => prev.filter(p => p.presetId !== presetId));
//       }
//     } catch (error) {
//       const status = error.response?.status;
//       if (status === 403) alert("삭제 권한이 없습니다.");
//       else if (status === 404) alert("이미 삭제된 데이터입니다.");
//       else alert("삭제 처리 중 오류가 발생했습니다.");
//     }
//   };

  
//   // 6. ✅ 카드 렌더링 함수 (공유 버튼 노출 조건만 수정)
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
//         <h3 css={S.presetName}>{item.presetName}</h3>
//         <ul css={S.infoList}>
//           <li><span css={S.badge}>빵</span> {getIng(1)}</li>
//           <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
//           <li><span css={S.badge}>소스</span> {getIng(4)}</li>
//         </ul>
//         <div css={S.buttonGroup}>
//           {/* ✅ 오리지널일 때만 공유 버튼 표시 (타인 게시글 저장 시에는 숨김) */}
//           {isOriginal && (
//             <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>
//           )}
//           <button css={S.btnOrder} onClick={() => navigate('/menu')}>주문</button>
//           {/* 삭제 시 postedUserId를 함께 넘기도록 수정 */}
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
//           <span style={{ color: '#1de5a9' }}>직접 주문하여 내 프리셋에 저장된 나만의 조합입니다.</span>
//         </div>
//         <div css={S.grid} style={{ marginBottom: '60px' }}>
//           {myOriginals.length === 0 ? (
//             <p style={{ color: '#aaa', gridColumn: '1/-1' }}>등록된 오리지널 레시피가 없습니다.</p>
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
//             <p style={{ color: '#aaa', gridColumn: '1/-1' }}>커뮤니티에서 저장한 레시피가 없습니다.</p>
//           ) : (
//             savedPresets.map(item => renderCard(item, true))
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }


