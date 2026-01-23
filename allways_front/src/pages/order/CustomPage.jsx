/** @jsxImportSource @emotion/react */
import * as s from "./customPageStyle";
import { useState, useEffect } from "react"; 
import { getIngredients } from "../../apis/items/orderApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../utils/cartStore";

function CustomPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { itemId } = useParams();

    const categoryName = location.state?.category;
    const selectedItem = location.state?.item;

    // ✅ 세트 관련 상태 추가
    const [selectedSet, setSelectedSet] = useState(null); // 'single' | 'setA' | 'setB' | 'setC' | 'setD'
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [selectedSide, setSelectedSide] = useState(null);
    const [drinks, setDrinks] = useState([]);
    const [wedges, setWedges] = useState([]); // 웨지감자
    const [chips, setChips] = useState([]);   // 칩
    const [cookies, setCookies] = useState([]); // 쿠키
    const [soups, setSoups] = useState([]);   // 수프
    
    // ✅ 데이터 캐싱용 - 한번 불러온 데이터는 재사용
    const [cachedIngredients, setCachedIngredients] = useState({});

    // ✅ 6단계로 확장 (세트 선택 단계 추가)
    const categories = [
        { id: '빵', name: '빵', limit: 1, required: true }, 
        { id: '치즈', name: '치즈', limit: 1, required: false },
        { id: '야채', name: '야채', limit: 8, required: false }, 
        { id: '소스', name: '소스', limit: 3, required: false }, 
        { id: '추가', name: '추가', limit: 3, required: false },
        { id: '세트', name: '세트 선택', limit: 1, required: false }, // ✅ 새로 추가
    ];

    const initialStep = categoryName === '샐러드' ? 2 : 1;
    
    const [step, setStep] = useState(initialStep);
    const [ingredients, setIngredients] = useState([]); 
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [allIngredients, setAllIngredients] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const currentCategory = categories[step - 1];

    const isRequiredStep = currentCategory?.required && 
        !(currentCategory.id === '빵' && categoryName === '샐러드');

    // ✅ 세트 옵션 데이터
    const setOptions = [
        { 
            id: 'single', 
            name: '단품', 
            description: '샌드위치만 주문',
            price: 0 
        },
        { 
            id: 'setA', 
            name: '웨지감자 세트', 
            description: '음료 + 웨지감자',
            price: 3000,
            sideType: 'wedge'
        },
        { 
            id: 'setB', 
            name: '칩 세트', 
            description: '음료 + 칩',
            price: 3000,
            sideType: 'chip'
        },
        { 
            id: 'setC', 
            name: '쿠키 세트', 
            description: '음료 + 쿠키',
            price: 3000,
            sideType: 'cookie'
        },
        { 
            id: 'setD', 
            name: '수프 세트', 
            description: '음료 + 수프',
            price: 3500,
            sideType: 'soup'
        }
    ];

    // ✅ 세트 단계일 때 음료/사이드 데이터 로드
    useEffect(() => {
        if (currentCategory?.id === '세트') {
            // ✅ 음료 데이터 로드
            const loadDrinks = async () => {
                if (cachedIngredients['음료']) {
                    setDrinks(cachedIngredients['음료']);
                    return;
                }
                
                try {
                    const response = await getIngredients('음료');
                    setDrinks(response.data);
                    setCachedIngredients(prev => ({ ...prev, '음료': response.data }));
                } catch (err) {
                    console.error('음료 로드 실패:', err);
                }
            };
            
            // ✅ 웨지감자 데이터 로드
            const loadWedges = async () => {
                if (cachedIngredients['웨지감자']) {
                    setWedges(cachedIngredients['웨지감자']);
                    return;
                }
                
                try {
                    const response = await getIngredients('웨지감자');
                    setWedges(response.data);
                    setCachedIngredients(prev => ({ ...prev, '웨지감자': response.data }));
                } catch (err) {
                    console.error('웨지감자 로드 실패:', err);
                }
            };
            
            // ✅ 칩 데이터 로드
            const loadChips = async () => {
                if (cachedIngredients['칩']) {
                    setChips(cachedIngredients['칩']);
                    return;
                }
                
                try {
                    const response = await getIngredients('칩');
                    setChips(response.data);
                    setCachedIngredients(prev => ({ ...prev, '칩': response.data }));
                } catch (err) {
                    console.error('칩 로드 실패:', err);
                }
            };
            
            // ✅ 쿠키 데이터 로드
            const loadCookies = async () => {
                if (cachedIngredients['쿠키']) {
                    setCookies(cachedIngredients['쿠키']);
                    return;
                }
                
                try {
                    const response = await getIngredients('쿠키');
                    setCookies(response.data);
                    setCachedIngredients(prev => ({ ...prev, '쿠키': response.data }));
                } catch (err) {
                    console.error('쿠키 로드 실패:', err);
                }
            };
            
            // ✅ 수프 데이터 로드
            const loadSoups = async () => {
                if (cachedIngredients['수프']) {
                    setSoups(cachedIngredients['수프']);
                    return;
                }
                
                try {
                    const response = await getIngredients('수프');
                    setSoups(response.data);
                    setCachedIngredients(prev => ({ ...prev, '수프': response.data }));
                } catch (err) {
                    console.error('수프 로드 실패:', err);
                }
            };
            
            loadDrinks();
            loadWedges();
            loadChips();
            loadCookies();
            loadSoups();
            
        } else if (currentCategory) {
            // ✅ 기존 재료 로드 (캐시 확인 후 불러오기)
            const categoryId = currentCategory.id;
            
            if (cachedIngredients[categoryId]) {
                // 이미 불러온 적 있으면 캐시에서 사용
                setIngredients(cachedIngredients[categoryId]);
            } else {
                // 처음 불러오는 거면 API 호출
                getIngredients(categoryId)
                    .then(response => {
                        setIngredients(response.data);
                        setCachedIngredients(prev => ({ 
                            ...prev, 
                            [categoryId]: response.data 
                        }));
                        setAllIngredients(prev => {
                            const newItems = response.data.filter(
                                newItem => !prev.some(oldItem => 
                                    oldItem.ingredientId === newItem.ingredientId)
                            );
                            return [...prev, ...newItems];
                        });
                    })
                    .catch(err => console.error(err));
            }
        }
    }, [step, currentCategory]);

    const handleIngredientClick = (ingredient) => {
        const categoryId = currentCategory.id;
        const ingredientId = ingredient.ingredientId;

        setSelectedIngredients(prev => {
            const currentSelected = prev[categoryId] || [];
            
            if (currentSelected.includes(ingredientId)) {
                return {
                    ...prev,
                    [categoryId]: currentSelected.filter(id => id !== ingredientId)
                };
            }

            let newSelection = [...currentSelected];

            if (newSelection.length >= currentCategory.limit) {
                newSelection.shift(); 
            }
            
            newSelection.push(ingredientId);

            return {
                ...prev,
                [categoryId]: newSelection
            };
        });
    };

    const handleSelectAllVegetables = () => {
        const categoryId = '야채';
        const currentSelected = selectedIngredients[categoryId] || [];
        
        if (currentSelected.length === ingredients.length) {
            setSelectedIngredients({ ...selectedIngredients, [categoryId]: [] });
        } else {
            const allIds = ingredients.map(ing => ing.ingredientId);
            setSelectedIngredients({ ...selectedIngredients, [categoryId]: allIds });
        }
    };

    // ✅ 세트 선택 핸들러
    const handleSetSelection = (setOption) => {
        setSelectedSet(setOption.id);
        
        // 세트 선택 시 기본 음료 자동 설정
        if (setOption.id !== 'single' && drinks.length > 0) {
            setSelectedDrink(drinks[0]);
        } else {
            setSelectedDrink(null);
        }
        
        // ✅ 사이드는 자동 설정하지 않고 사용자가 직접 선택하도록 null로 초기화
        setSelectedSide(null);
    };

    const handleNextStep = () => {
        const currentSelected = selectedIngredients[currentCategory.id] || [];
        
        // 세트 선택 단계가 아닌 경우의 검증
        if (currentCategory.id !== '세트' && isRequiredStep && currentSelected.length === 0) {
            alert(`${currentCategory.name}을(를) 선택해주세요! (필수 항목)`);
            return;
        }

        // ✅ 세트 단계 검증
        if (currentCategory.id === '세트') {
            if (!selectedSet) {
                alert('단품 또는 세트를 선택해주세요!');
                return;
            }
            
            // ✅ 세트 선택 시 음료와 사이드 선택 필수
            if (selectedSet !== 'single') {
                if (!selectedDrink) {
                    alert('음료를 선택해주세요!');
                    return;
                }
                if (!selectedSide) {
                    alert('사이드를 선택해주세요!');
                    return;
                }
            }
        }

        if (step < categories.length) {
            setStep(step + 1);
        } else {
            handleAddToCart();
        }
    };

    // ✅ 장바구니 추가 로직 (세트 정보 포함)
    const handleAddToCart = () => {
        const allSelectedIds = Object.values(selectedIngredients).flat();
        const selectedDetails = allIngredients.filter(ing => 
            allSelectedIds.includes(ing.ingredientId)
        );

        const extraPrice = selectedDetails.reduce((sum, ing) => sum + (ing.price || 0), 0);
        
        // ✅ 세트 가격 계산
        let setPrice = 0;
        if (selectedSet && selectedSet !== 'single') {
            const setOption = setOptions.find(s => s.id === selectedSet);
            setPrice = setOption?.price || 0;
        }
        
        const finalPrice = (selectedItem?.price || 0) + extraPrice + setPrice;
        const ingredientNames = selectedDetails.map(ing => ing.ingredientName);

        const orderItem = {
            itemId: parseInt(itemId),
            itemName: selectedItem?.itemName,
            imgUrl: selectedItem?.imgUrl,
            quantity: quantity,
            ingredientIds: allSelectedIds,
            ingredientName: ingredientNames, 
            price: finalPrice,
            size: selectedItem?.size,
            setInfo: selectedSet ? {
                type: selectedSet,
                drink: selectedDrink,
                side: selectedSide,
                setPrice: setPrice
            } : null
        };

        addToCart(orderItem);
        alert('장바구니에 추가되었습니다!');
        navigate('/cart');
    };

    const getSelectedCount = () => selectedIngredients[currentCategory?.id]?.length || 0;

    const renderSetSelection = () => {
        if (currentCategory.id !== '세트') return null;

        let availableSides = [];
        if (selectedSet === 'setA') availableSides = wedges;
        else if (selectedSet === 'setB') availableSides = chips;
        else if (selectedSet === 'setC') availableSides = cookies;
        else if (selectedSet === 'setD') availableSides = soups;

        return (
            <div>
                <div css={s.ingredientsGridStyle}>
                    {setOptions.map(setOption => (
                        <button 
                            key={setOption.id}
                            onClick={() => handleSetSelection(setOption)}
                            css={[
                                s.ingredientCardStyle, 
                                selectedSet === setOption.id && s.ingredientCardSelectedStyle
                            ]}
                        >
                            <div css={s.ingredientInfoStyle}>
                                <div css={s.ingredientNameStyle}>{setOption.name}</div>
                                <div style={{ fontSize: '12px', color: '#666', margin: '5px 0' }}>
                                    {setOption.description}
                                </div>
                                <div css={s.ingredientPriceStyle}>
                                    {setOption.price > 0 ? `+${setOption.price.toLocaleString()}원` : '추가 금액 없음'}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>

                {selectedSet && selectedSet !== 'single' && (
                    <>
                        <div style={{ marginTop: '30px' }}>
                            <h4>
                                {selectedSet === 'setA' && '웨지감자 선택'}
                                {selectedSet === 'setB' && '칩 선택'}
                                {selectedSet === 'setC' && '쿠키 선택'}
                                {selectedSet === 'setD' && '수프 선택'}
                            </h4>
                            <div css={s.ingredientsGridStyle}>
                                {availableSides.map(side => (
                                    <button 
                                        key={side.ingredientId}
                                        onClick={() => setSelectedSide(side)}
                                        css={[
                                            s.ingredientCardStyle,
                                            selectedSide?.ingredientId === side.ingredientId && s.ingredientCardSelectedStyle
                                        ]}
                                    >
                                        <div css={s.ingredientImageWrapperStyle}>
                                            <img src={side.imgUrl} alt={side.ingredientName} css={s.ingredientImageStyle} />
                                            {selectedSide?.ingredientId === side.ingredientId && (
                                                <div css={s.selectedBadgeStyle}>✓</div>
                                            )}
                                        </div>
                                        <div css={s.ingredientInfoStyle}>
                                            <div css={s.ingredientNameStyle}>{side.ingredientName}</div>
                                            <div css={s.ingredientPriceStyle}>
                                                {side.price > 0 ? `+${side.price}원` : '무료'}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                            <div style={{ marginTop: '30px' }}>
                            <h4>음료 선택 (필수)</h4>
                            <div css={s.ingredientsGridStyle}>
                                {drinks.map(drink => (
                                    <button 
                                        key={drink.ingredientId}
                                        onClick={() => setSelectedDrink(drink)}
                                        css={[
                                            s.ingredientCardStyle,
                                            selectedDrink?.ingredientId === drink.ingredientId && s.ingredientCardSelectedStyle
                                        ]}
                                    >
                                        <div css={s.ingredientImageWrapperStyle}>
                                            <img src={drink.imgUrl} alt={drink.ingredientName} css={s.ingredientImageStyle} />
                                            {selectedDrink?.ingredientId === drink.ingredientId && (
                                                <div css={s.selectedBadgeStyle}>✓</div>
                                            )}
                                        </div>
                                        <div css={s.ingredientInfoStyle}>
                                            <div css={s.ingredientNameStyle}>{drink.ingredientName}</div>
                                            <div css={s.ingredientPriceStyle}>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div css={s.containerStyle}>
            <div css={s.headerStyle}>
                <button onClick={() => navigate('/menu')} css={s.cancelButtonStyle}>취소</button>
                <h2>{selectedItem?.itemName} 커스텀</h2>
                <button onClick={() => navigate('/cart')} css={s.cartButtonStyle}>장바구니</button>
            </div>

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
                        {step}단계: {currentCategory?.name} {isRequiredStep ? "(필수)" : "(선택)"}
                        {currentCategory?.id !== '세트' && (
                            <span style={{fontSize: '14px', marginLeft: '10px'}}>
                                ({getSelectedCount()}/{currentCategory?.limit})
                            </span>
                        )}
                    </h3>
                    
                    {currentCategory?.id === '야채' && (
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button onClick={handleSelectAllVegetables} css={s.actionButtonStyle}>
                                {(selectedIngredients['야채']?.length === ingredients.length) ? "전부 빼기" : "전부 넣기"}
                            </button>
                        </div>
                    )}
                </div>

                {currentCategory?.id === '세트' ? (
                    renderSetSelection()
                ) : (
                    <div css={s.ingredientsGridStyle}>
                        {ingredients.map(ingredient => {
                            const isSelected = (selectedIngredients[currentCategory.id] || [])
                                .includes(ingredient.ingredientId);
                            return (
                                <button 
                                    key={ingredient.ingredientId} 
                                    onClick={() => handleIngredientClick(ingredient)}
                                    css={[s.ingredientCardStyle, isSelected && s.ingredientCardSelectedStyle]}
                                >
                                    <div css={s.ingredientImageWrapperStyle}>
                                        <img src={ingredient.imgUrl} alt={ingredient.ingredientName} css={s.ingredientImageStyle} />
                                        {isSelected && <div css={s.selectedBadgeStyle}>✓</div>}
                                    </div>
                                    <div css={s.ingredientInfoStyle}>
                                        <div css={s.ingredientNameStyle}>{ingredient.ingredientName}</div>
                                        <div css={s.ingredientPriceStyle}>
                                            {ingredient.price > 0 ? `+${ingredient.price}원` : '무료'}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}
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