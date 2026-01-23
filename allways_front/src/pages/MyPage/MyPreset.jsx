/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './MyPreset.styles.js';
import axios from 'axios';

export default function MyPreSet() {
  const navigate = useNavigate();
  const [presets, setPresets] = useState([]);

  // 1. 토큰에서 내 userId 추출 (진현님의 ID인 2번 등을 판별하기 위함)
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

  // 2. 프리셋 목록 및 정밀 진단 (기존 checkData 로직 유지)
  useEffect(() => {
    const checkData = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:8080/api/preset/list/${userId}`);
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

  // 3. 분류 로직: 진현님의 기획대로 "(by " 포함 여부로 결정
  // 주문 내역에서 저장된 것은 이름 그대로(오리지널), 커뮤니티 저장본은 (by 원작자)가 붙음
  const myOriginals = useMemo(() => {
    return presets.filter(p => !p.presetName.includes("(by ")); 
  }, [presets]);

  const savedPresets = useMemo(() => {
    return presets.filter(p => p.presetName.includes("(by ")); 
  }, [presets]);


  // 4. 공유 핸들러 (오리지널 전용)
  const handleShare = async (preset) => {
    if (!window.confirm(`'${preset.presetName}' 레시피를 커뮤니티에 공유하시겠습니까?`)) return;
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(`http://localhost:8080/api/post/create`, 
        { presetId: preset.presetId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200 || response.status === 201) {
        alert("커뮤니티에 성공적으로 공유되었습니다!");
        navigate('/community');
      }
    } catch (error) {
      alert(`공유 중 오류가 발생했습니다. (코드: ${error.response?.status})`);
    }
  };

  // 5. 삭제 핸들러 (이름에 따른 메시지 분기 로직 포함)
  const handleDelete = async (presetId, presetName) => {
    const isScrapped = presetName.includes("(by ");
    
    let confirmMsg = isScrapped 
      ? `커뮤니티에서 저장한 프리셋입니다. 내 목록에서만 삭제하시겠습니까?` 
      : `회원님이 직접 만든 프리셋입니다.\n삭제 시 커뮤니티에 공유된 게시글도 '동시 삭제' 됩니다. 진행하시겠습니까?`;

    if (!window.confirm(confirmMsg)) return;

    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(`http://localhost:8080/api/preset/${presetId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200 || response.status === 204) {
        alert("삭제되었습니다.");
        setPresets(prev => prev.filter(p => p.presetId !== presetId));
      }
    } catch (error) {
      const status = error.response?.status;
      if (status === 403) alert("삭제 권한이 없습니다.");
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
          {/* 타인 레시피(isSaved)일 경우 배지 노출 */}
          {isSaved && <div style={{ position: 'absolute', top: 5, right: 5, backgroundColor: '#009223', color: 'white', padding: '2px 6px', fontSize: '10px', borderRadius: '4px' }}>SAVED</div>}
        </div>
        <h3 css={S.presetName}>{item.presetName}</h3>
        <ul css={S.infoList}>
          <li><span css={S.badge}>빵</span> {getIng(1)}</li>
          <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
          <li><span css={S.badge}>소스</span> {getIng(4)}</li>
        </ul>
        <div css={S.buttonGroup}>
          {/* 내 오리지널일 때만 공유 버튼 노출 */}
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
        {/* 1. 오리지널 레시피 섹션 (주문 내역에서 저장된 것) */}
        <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#ffce32' }}>🛠️ 회원님의 오리지널 레시피</h2>
          <span style={{ color: '#eee' }}>직접 주문하여 내 프리셋에 저장된 나만의 조합입니다.</span>
        </div>
        <div css={S.grid} style={{ marginBottom: '60px' }}>
          {myOriginals.length === 0 ? (
            <p style={{ color: '#aaa', gridColumn: '1/-1' }}>등록된 오리지널 레시피가 없습니다.</p>
          ) : (
            myOriginals.map(item => renderCard(item, false)) 
          )}
        </div>

        {/* 2. 저장된 커뮤니티 레시피 섹션 (타인 레시피 - by 표시됨) */}
        <div css={S.sectionHeader} style={{ marginBottom: '20px' }}>
          <h2 style={{ color: '#009223' }}>📥 저장된 커뮤니티 레시피</h2>
          <span style={{ color: '#eee' }}>다른 사용자의 꿀조합을 저장한 내역입니다.</span>
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


// /** @jsxImportSource @emotion/react */
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { S } from './MyPreset.styles.js';
// import axios from 'axios';

// export default function MyPreSet() {
//   const navigate = useNavigate();
//   const [presets, setPresets] = useState([]);

//   // 1. 토큰에서 userId 추출 - 이 부분은 데이터 조회를 위해 꼭 필요합니다.
//   const getUserIdFromToken = () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return null;
//     try {
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
//       const decoded = JSON.parse(jsonPayload);
//       return decoded.userId || decoded.id || decoded.sub; //
//     } catch (e) { return null; }
//   };

//   const userId = getUserIdFromToken();

//   // 2. 프리셋 목록만 깔끔하게 불러오기
//   const fetchMyPresets = async () => {
//     if (!userId) return;
//     try {
//       const response = await axios.get(`http://localhost:8080/api/preset/list/${userId}`);
//       setPresets(response.data || []);
//     } catch (error) {
//       console.error("프리셋 로드 실패:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMyPresets();
//   }, [userId]);


//   // 3. 공유 버튼 클릭시 커뮤니티로 이동되게끔 하는 핸들러 생성
//   // [추가] 공유 버튼 클릭 핸들러
//   const handleShare = async (preset) => {
//     if (!window.confirm(`'${preset.presetName}' 레시피를 커뮤니티에 공유하시겠습니까?`)) return;

//     // 1번 로직에서 사용하는 토큰을 다시 가져옵니다.
//     const token = localStorage.getItem("accessToken");

//     try {
//       // API 설계: 커뮤니티 포스트를 생성하는 엔드포인트
//       // 보통 프리셋 ID와 유저 ID를 보내면 서버에서 해당 프리셋 정보를 복사해 게시글을 생성합니다.
//       const response = await axios.post(
//         `http://localhost:8080/api/post/create`, 
//         {
//           presetId: preset.presetId,
//         },
//         {
//           // ★ 이 부분이 핵심입니다! 서버 보안 통과를 위한 헤더 설정
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       if (response.status === 200 || response.status === 201) {
//         alert("커뮤니티에 성공적으로 공유되었습니다!");
//         navigate('/community'); // 공유 후 커뮤니티 페이지로 이동
//       }
//     } catch (error) {
//       console.error("공유 실패:", error);
//       // 이제 401 대신 404가 뜬다면, 서버에 해당 API 주소가 아직 없다는 뜻입니다.
//       alert(`공유 중 오류가 발생했습니다. (에러 코드: ${error.response?.status})`);

//       // 에러 상황별 메시지 처리
//       const status = error.response?.status;
//       if (status === 401) {
//         alert("인증 세션이 만료되었습니다. 다시 로그인해주세요.");
//       } else if (status === 404) {
//         alert("API 경로를 찾을 수 없습니다. (서버 주소 확인 필요)");
//       } else {
//         alert(`공유 중 오류가 발생했습니다. (상태 코드: ${status || 'Network Error'})`);
//       }
//     }
//   };



//   // 프리셋 저장 내역 삭제하기
// const handleDelete = async (presetId) => {
//   if (!window.confirm("이 프리셋을 삭제하시겠습니까?\n(작성자 본인이 커뮤니티에 공유하셨다면, 게시글도 함께 삭제됩니다.)")) return;

//   const token = localStorage.getItem("accessToken");


//   try {
//     // 2. ⭐ API 주소 확인: 보통 삭제는 특정 ID를 타겟팅합니다.
//     // 백엔드 설계에 따라 /api/preset/{presetId} 혹은 /api/preset/delete/{presetId} 일 가능성이 높습니다.
//     const response = await axios.delete(`http://localhost:8080/api/preset/list/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if (response.status === 200 || response.status === 204) {
//           alert("삭제되었습니다.");
          
//           // 화면 갱신: 현재 프리셋 목록에서 삭제된 아이디만 제외하고 상태 업데이트
//           setPresets(prev => prev.filter(p => p.presetId !== presetId));
//         }
//       } catch (error) {

//         // 401 에러가 나면 토큰 문제임을 알림
//         console.error("삭제 실패:", error);
//           if (error.response?.status === 401) {
//               alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
//               if (status === 401) {
//             alert("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
//           } else if (status === 403) {
//             alert("삭제 권한이 없습니다.");
//           } else {
//             alert(`삭제 오류: ${status || '네트워크 에러'}`);
//           }
//         }
//       }
//     };

//   return (
//     <div css={S.wrapper}>
//       <section css={S.titleSection}>
//         <div css={S.titleContainer}>
//           {/* 이름 대신 깔끔하게 서비스명으로 유지합니다. */}
//           <h1 css={S.mainTitle}>My <span css={S.yellowText}>PreSet</span></h1>
//         </div>
//       </section>

//       <main css={S.container}>
//         <div css={S.grid}>
//           {presets.length === 0 ? (
//             <div style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center', padding: '50px' }}>
//               저장된 프리셋이 없습니다.
//             </div>
//           ) : (
//             presets.map((item) => {
//               const ingredients = item.product?.ingredients || [];
//               const getIng = (catId) => ingredients.find(i => i.ingredientCategoryId === catId)?.ingredientName || "선택안함";

//               console.log(`${item.presetName}의 전체 데이터:`, item);

//               return (
//                 <div key={item.presetId} css={S.card}>
//                   <div css={S.imageArea}>
//                     <img src={item.imgUrl} />
//                   </div>
//                   {/* <div css={S.imageArea}>
//                     <img src={ingredients[0]?.img_url || "/default-subway.png"} alt={item.presetName} />
//                   </div> */}
//                   <h3 css={S.presetName}>{item.presetName}</h3>
//                   <ul css={S.infoList}>
//                     <li><span css={S.badge}>빵</span> {getIng(1)}</li>
//                     <li><span css={S.badge}>치즈</span> {getIng(2)}</li>
//                     <li><span css={S.badge}>소스</span> {getIng(4)}</li>
//                   </ul>
//                   <div css={S.buttonGroup}>
//                     <button css={S.btnShare} onClick={() => handleShare(item)}>공유</button>
//                     <button css={S.btnOrder} onClick={() => { if (window.confirm('주문 페이지로 이동하시겠습니까?')) navigate('/menu'); }}>주문</button>
//                     {/* 삭제 기능은 presetId를 사용하여 정상 작동합니다. */}
//                     <button css={S.btnDelete} onClick={() => handleDelete(item.presetId)}>삭제</button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
