/** @jsxImportSource @emotion/react */
import  * as s  from "./customPageStyle"; // 스타일 파일 임포트
import { useState, useEffect } from "react"; // React 훅 임포트
import { getIngredients, getSetMenus } from "../../apis/items/orderApi"; // 재료 및 세트 API 임포트
import { useLocation, useNavigate, useParams } from "react-router-dom"; // 라우팅 관련 훅 임포트
import { addToCart } from "../../utils/cartStore"; // 장바구니 저장 유틸 임포트

function CustomPage() {
    const location = useLocation(); // 현재 경로 정보 객체
    const navigate = useNavigate(); // 페이지 이동 함수
    const { itemId } = useParams(); // URL 파라미터에서 상품 ID 추출

    const categoryName = location.state?.category; // 이전 페이지에서 전달받은 카테고리명
    const selectedItem = location.state?.item; // 이전 페이지에서 선택한 상품 정보

    // 커스텀 단계 정의 (6단계 '세트' 추가)
    const categories = [
        { id: '빵', name: '빵', limit: 1, required: true }, 
        { id: '치즈', name: '치즈', limit: 1, required: false },
        { id: '야채', name: '야채', limit: 8, required: false }, 
        { id: '소스', name: '소스', limit: 3, required: false }, 
        { id: '추가', name: '추가', limit: 3, required: false },
        { id: '세트', name: '세트선택', limit: 1, required: true }, // [신규] 세트 단계 추가
    ];

    const initialStep = categoryName === '샐러드' ? 2 : 1; // 샐러드면 빵 선택 건너뜀
    
    const [step, setStep] = useState(initialStep); // 현재 단계 상태
    const [ingredients, setIngredients] = useState([]); // 현재 단계의 재료 목록
    const [selectedIngredients, setSelectedIngredients] = useState({}); // 선택된 재료들 (카테고리별 저장)
    const [allIngredients, setAllIngredients] = useState([]); // 누적된 전체 재료 정보
    const [sets, setSets] = useState([]); // [신규] 서버에서 가져온 세트 메뉴 목록 저장
    const [selectedSet, setSelectedSet] = useState(null); // [신규] 선택된 세트 객체 저장
    const [quantity, setQuantity] = useState(1); // 주문 수량
    
    const currentCategory = categories[step - 1]; // 현재 진행 중인 단계 객체

    // 필수 항목 여부 계산 (샐러드일 때 빵 단계 제외)
    const isRequiredStep = currentCategory?.required && !(currentCategory.id === '빵' && categoryName === '샐러드');

    useEffect(() => {
        if (!currentCategory) return; // 단계 정보가 없으면 종료

        if (currentCategory.id === '세트') {
            // 6단계일 경우 세트 메뉴 API 호출
            getSetMenus()
                .then(response => {
                    setSets(response.data); // 세트 목록 상태 업데이트
                })
                .catch(err => console.error(err));
        } else {
            // 1~5단계일 경우 재료 API 호출
            getIngredients(currentCategory.id)
                .then(response => {
                    setIngredients(response.data); // 재료 목록 상태 업데이트
                    setAllIngredients(prev => {
                        // 중복되지 않은 재료만 전체 목록에 추가
                        const newItems = response.data.filter(
                            newItem => !prev.some(oldItem => oldItem.ingredientId === newItem.ingredientId)
                        )
                        return [...prev, ...newItems];
                    })
                })
                .catch(err => console.error(err));
        }
    }, [step]); // 단계가 바뀔 때마다 실행


    const handleIngredientClick = (ingredient) => {
        const categoryId = currentCategory.id; // 현재 카테고리 ID (빵, 치즈 등)
        const ingredientId = ingredient.ingredientId; // 클릭한 재료 ID

        setSelectedIngredients(prev => {
            const currentSelected = prev[categoryId] || []; // 기존에 선택된 해당 카테고리 재료
            
            // 이미 선택된 상태라면 제거 (토글)
            if (currentSelected.includes(ingredientId)) {
                return {
                    ...prev,
                    [categoryId]: currentSelected.filter(id => id !== ingredientId)
                };
            }

            let newSelection = [...currentSelected];

            // 선택 제한 개수 도달 시 가장 먼저 선택한 것 제거 (FIFO)
            if (newSelection.length >= currentCategory.limit) {
                newSelection.shift(); 
            }
            
            newSelection.push(ingredientId); // 새 재료 추가

            return {
                ...prev,
                [categoryId]: newSelection
            };
        });
    };

    // [신규] 세트 아이템 클릭 시 처리 함수
    const handleSetClick = (set) => {
        setSelectedSet(set); // 선택한 세트 객체를 상태에 저장
    };

    const handleSelectAllVegetables = () => {
        const categoryId = '야채';
        const currentSelected = selectedIngredients[categoryId] || [];
        
        // 야채가 전부 선택되어 있으면 비우기, 아니면 전체 채우기
        if (currentSelected.length === ingredients.length) {
            setSelectedIngredients({ ...selectedIngredients, [categoryId]: [] });
        } else {
            const allIds = ingredients.map(ing => ing.ingredientId);
            setSelectedIngredients({ ...selectedIngredients, [categoryId]: allIds });
        }
    };

    const handleNextStep = () => {
        // 현재 선택 상태 확인
        const currentSelected = (currentCategory.id === '세트') 
            ? (selectedSet ? [selectedSet.setId] : []) 
            : (selectedIngredients[currentCategory.id] || []);
        
        // 필수 항목 미선택 시 경고
        if (isRequiredStep && currentSelected.length === 0) {
            alert(`${currentCategory.name}을(를) 선택해주세요! (필수 항목)`);
            return;
        }

        // 마지막 단계가 아니면 다음 단계로, 마지막이면 장바구니 담기
        if (step < categories.length) {
            setStep(step + 1);
        } else {
            handleAddToCart();
        }
    };

    const handleAddToCart = () => {
        const allSelectedIds = Object.values(selectedIngredients).flat(); // 선택한 모든 재료 ID 합치기

        // ID 목록을 바탕으로 전체 재료 객체 필터링
        const selectedDetails = allIngredients.filter(ing => 
            allSelectedIds.includes(ing.ingredientId)
        );

        // 재료 추가 비용 계산
        const extraPrice = selectedDetails.reduce((sum, ing) => sum + (ing.price || 0), 0);
        // 세트 추가 비용 계산
        const setPrice = selectedSet ? (selectedSet.additionalPrice || 0) : 0;
        // 최종 가격 = 기본가 + 재료비 + 세트비
        const finalPrice = (selectedItem?.price || 0) + extraPrice + setPrice;

        const ingredientNames = selectedDetails.map(ing => ing.ingredientName); // 재료 이름 리스트

        // 최종 주문 아이템 객체 생성
        const orderItem = {
            itemId: parseInt(itemId), // 상품 ID
            itemName: selectedItem?.itemName, // 상품 이름
            imgUrl: selectedItem?.imgUrl, // 이미지
            quantity: quantity, // 수량
            ingredientIds: allSelectedIds, // 선택한 재료 ID 목록
            ingredientName: ingredientNames, // 선택한 재료 이름 목록
            price: finalPrice, // 합산 가격
            size: selectedItem?.size, // 사이즈
            setId: selectedSet?.setId, // [신규] 세트 ID 추가
            setName: selectedSet?.setName, // [신규] 세트 이름 추가
        };

        addToCart(orderItem); // 장바구니 저장
        alert('장바구니에 추가되었습니다!');
        navigate('/cart'); // 장바구니 이동
    };

    // 현재 단계에서 선택된 개수 반환
    const getSelectedCount = () => {
        if (currentCategory?.id === '세트') return selectedSet ? 1 : 0;
        return selectedIngredients[currentCategory?.id]?.length || 0;
    };

    return (
        <div css={s.containerStyle}>
            <div css={s.headerStyle}>
                <button onClick={() => navigate('/menu')} css={s.cancelButtonStyle}>취소</button>
                <h2>{selectedItem?.itemName} 커스텀</h2>
                <button onClick={() => navigate('/cart')} css={s.cartButtonStyle}>장바구니</button>
            </div>

            {/* 단계별 상태 바 */}
            <div css={s.progressBarStyle}>
                {categories.map((cat, idx) => (
                    <div key={cat.id} css={[
                        s.progressStepStyle, 
                        (idx + 1) === step && s.progressStepActiveStyle,
                        (idx + 1) < step && s.progressStepDoneStyle,
                        (categoryName === '샐러드' && (idx + 1) === 1) && s.progressStepSkippedStyle
                    ]}>
                        {cat.name}
                    </div>
                ))}
            </div>

            <div css={s.contentStyle}>
                <div css={s.stepHeaderStyle}>
                    <h3>
                        {step}단계: {currentCategory?.name}
                        <span style={{fontSize: '14px', marginLeft: '10px'}}>
                            ({getSelectedCount()}/{currentCategory?.limit})
                        </span>
                    </h3>
                    
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {currentCategory?.id === '야채' && (
                            <button onClick={handleSelectAllVegetables} css={s.actionButtonStyle}>
                                { (selectedIngredients['야채']?.length === ingredients.length) ? "전부 빼기" : "전부 넣기" }
                            </button>
                        )}  
                    </div>
                </div>

                {/* 재료 또는 세트 카드 그리드 */}
                <div css={s.ingredientsGridStyle}>
                    {currentCategory?.id === '세트' ? (
                        // 6단계: 세트 리스트 렌더링
                        sets.map(set => (
                            <button 
                                key={set.setId} 
                                onClick={() => handleSetClick(set)}
                                css={[s.ingredientCardStyle, selectedSet?.setId === set.setId && s.ingredientCardSelectedStyle]}
                            >
                                <div css={s.ingredientInfoStyle}>
                                    <div css={s.ingredientNameStyle}>{set.setName}</div>
                                    <div css={{fontSize: '12px', color: '#666'}}>{set.description}</div>
                                    <div css={s.ingredientPriceStyle}>
                                        {set.additionalPrice > 0 ? `+${set.additionalPrice}원` : '추가금 없음'}
                                    </div>
                                </div>
                                {selectedSet?.setId === set.setId && <div css={s.selectedBadgeStyle}>✓</div>}
                            </button>
                        ))
                    ) : (
                        // 1~5단계: 재료 리스트 렌더링
                        ingredients.map(ingredient => {
                            const isSelected = (selectedIngredients[currentCategory.id] || []).includes(ingredient.ingredientId);
                            return (
                                <button 
                                    key={ingredient.ingredientId} 
                                    onClick={() => handleIngredientClick(ingredient)}
                                    css={[s.ingredientCardStyle, isSelected && s.ingredientCardSelectedStyle]}
                                >
                                    <div css={s.ingredientImageWrapperStyle}>
                                        <img src={ingredient.imageUrl} alt={ingredient.ingredientName} css={s.ingredientImageStyle} />
                                        {isSelected && <div css={s.selectedBadgeStyle}>✓</div>}
                                    </div>
                                    <div css={s.ingredientInfoStyle}>
                                        <div css={s.ingredientNameStyle}>{ingredient.ingredientName}</div>
                                        <div css={s.ingredientPriceStyle}>{ingredient.price > 0 ? `+${ingredient.price}원` : null}</div>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>
            </div>

            <div css={s.footerStyle}>
                <button 
                    disabled={step <= initialStep} 
                    onClick={() => setStep(step - 1)}
                    css={[s.navButtonStyle, step <= initialStep && s.disabledButtonStyle]}
                >
                    이전
                </button>
                <button onClick={handleNextStep} css={[s.navButtonStyle, s.nextButtonStyle]}>
                    {step === categories.length ? "장바구니 담기" : "다음"}
                </button>
            </div>
        </div>
    );
}

export default CustomPage;