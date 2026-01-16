/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react"; 
import { getIngredients } from "../../apis/items/orderApi";
import { S } from "./CustomPage.styles"; // My Page 스타일 파일 임포트

function CustomPage() {
    const [ step, setStep ] = useState(1); 
    const [ ingredients, setIngredients ] = useState([]); 

    const categories = [
        { id: '빵', name: '빵' }, 
        { id: '치즈', name: '치즈' },
        { id: '야채', name: '야채' }, 
        { id: '소스', name: '소스' }, 
        { id: '추가', name: '추가' },
        { id: '세트', name: '세트' },
    ];
    
    const currentCategory = categories[step - 1];

    useEffect(() => {
        if (currentCategory) {
            getIngredients(currentCategory.id)
                .then(response => {
                    setIngredients(response.data);
                })
                .catch(err => console.error(err));
        }
    }, [step]);

    const handleNextStep = () => {
        if (step < categories.length) {
            setStep(step + 1);
        } else {
            alert("마지막 단계입니다");
        }
    };

    return (
    /* [실험] 마이페이지와 동일한 1000px 중앙 정렬 그릇 */
    <div style={{ 
        maxWidth: '1000px', 
        margin: '0 auto', 
        padding: '40px 20px',
        minHeight: '100vh' 
    }}>
        
        {/* 제목 스타일 평형 맞추기 */}
        <h1 style={{ 
            fontSize: '2.5rem', 
            color: '#009223', 
            borderBottom: '3px solid #ffc107', 
            display: 'inline-block',
            marginBottom: '40px',
            fontWeight: '900'
        }}>
            커스텀 주문
        </h1>
        
        <div style={{ marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                {step}단계: {currentCategory?.name} 선택
            </h3>
            
            {/* 재료 영역 (임시 높이 부여로 레이아웃 확인) */}
            <div style={{ minHeight: '300px', border: '1px dashed #eee', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                {ingredients.length > 0 ? (
                    "재료 카드가 여기에 들어옵니다"
                ) : (
                    <p style={{ color: '#666' }}>재료를 불러오는 중이거나 데이터가 없습니다.</p>
                )}
            </div>
        </div>

        {/* 하단 버튼: 중앙 정렬된 그릇 안에서 양 끝 배치 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button 
                disabled={step === 1} 
                onClick={() => setStep(step - 1)}
                style={{ padding: '10px 25px', borderRadius: '15px', border: '1px solid #ccc', cursor: 'pointer' }}
            >
                이전
            </button>
            
            <button 
                onClick={handleNextStep}
                style={{ padding: '10px 30px', borderRadius: '25px', border: 'none', backgroundColor: '#ffc107', fontWeight: 'bold', cursor: 'pointer' }}
            >
                {step === categories.length ? "주문 완료" : "다음 단계"}
            </button>
        </div>
    </div>
);
}

export default CustomPage;

//--------------------- 위의 코드는  임시적으로 레이아웃 조정을 하기 위해 화면 확인용으로 사용하였습니다 --------------------------
//--------------------- 주석처리된 아래의 코드가 마지막으로 작성된 코드이고 사용을 이어서 할 수 있도록 주석으로 남겼습니다 ------------

// /** @jsxImportSource @emotion/react */
// import { useState, useEffect } from "react"; 
// import { getIngredients } from "../../apis/items/orderApi";

// function CustomPage() {
//     const [ step, setStep ] = useState(1); 
//     const [ ingredients, setIngredients ] = useState([]); 

//     const categories = [
//         { id: '빵', name: '빵' }, 
//         { id: '치즈', name: '치즈' },
//         { id: '야채', name: '야채' }, 
//         { id: '소스', name: '소스' }, 
//         { id: '추가', name: '추가' },
//         { id: '세트', name: '세트' },
//     ];
    
//     const currentCategory = categories[step - 1];

//     useEffect(() => {
//         if (currentCategory) {
//             getIngredients(currentCategory.id)
//                 .then(response => {
//                     setIngredients(response.data);
//                 })
//                 .catch(err => console.error(err));
//         }
//     }, [step]);

//     const handleNextStep = () => {
//         if (step < categories.length) {
//             setStep(step + 1);
//         } else {
//             alert("마지막 단계입니다");
//         }
//     };

//     return (
//         <>
//             <button disabled={step === 1} onClick={() => setStep(step - 1)}>
//                 이전
//             </button>
            
//             <div>
//                 <h3>{step}단계: {currentCategory?.name} 선택</h3>
//                 <div>
//                     {ingredients.length > 0 ? (
//                         ingredients.map(item => (
//                             <button key={item.ingredientId} onClick={() => console.log(item)}>
//                                 <img 
//                                     src={item.imgUrl} 
//                                     style={{ width: "100px", height: "100px", objectFit: "cover" }} 
//                                 />
//                                 <br/>
//                                 {item.ingredientName} <br />
//                                 {item.price} 
//                             </button>
//                         ))
//                     ) : (
//                         <p>재료를 불러오는 중이거나 데이터가 없습니다.</p>
//                     )}
//                 </div>
//             </div>

//             <button onClick={handleNextStep}>
//                 {step === categories.length ? "주문 완료" : "다음"}
//             </button>
//         </>
//     );
// }

// export default CustomPage;