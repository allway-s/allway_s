/** @jsxImportSource @emotion/react */
import * as s from "./customPageStyle";
import { useState, useEffect } from "react"; 
import { getIngredients, getSets, getSetDetail } from "../../apis/items/menuApi";
import { useLocation, useNavigate, useParams } from "react-router-dom"; 
import { addToCart } from "../../utils/cartStore"; 

function CustomPage() {
    
    const location = useLocation();
    const navigate = useNavigate();
    const { itemId } = useParams();

    const categoryName = location.state?.category;
    const selectedItem = location.state?.item;
    
    // ✅ 썹픽 모드 확인
    const isSubwayPick = location.state?.isSubwayPick || false;
    const subwayPickData = location.state?.subwayPickData || null;

    const categories = [
        { id: '빵', name: '빵', limit: 1, required: true }, 
        { id: '치즈', name: '치즈', limit: 1, required: false },
        { id: '야채', name: '야채', limit: 8, required: false }, 
        { id: '소스', name: '소스', limit: 3, required: false }, 
        { id: '추가', name: '추가', limit: 3, required: false },
        { id: '세트', name: '세트선택', limit: 1, required: true }, 
    ];
    
    // ✅ 썹픽 모드일 때는 바로 세트 선택(6단계)로 이동
    const initialStep = isSubwayPick ? 6 : (categoryName === '샐러드' ? 2 : 1);
    
    const [step, setStep] = useState(initialStep);
    const [ingredients, setIngredients] = useState([]); 
    const [selectedIngredients, setSelectedIngredients] = useState({});
    
    const [setMenus, setSetMenus] = useState([]);
    const [selectedSetId, setSelectedSetId] = useState(null);
    const [setComponents, setSetComponents] = useState(null);
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [selectedSide, setSelectedSide] = useState(null);
    const [drinkOptions, setDrinkOptions] = useState([]);
    const [sideOptions, setSideOptions] = useState([]);

    const [allIngredients, setAllIngredients] = useState([]);
    const [quantity, setQuantity] = useState(1);
    
    const currentCategory = categories[step - 1];
    const isRequiredStep = currentCategory?.required && !(currentCategory.id === '빵' && categoryName === '샐러드');

    // ✅ 썹픽 모드일 때 초기 재료 설정
    useEffect(() => {
        if (isSubwayPick && subwayPickData) {
            console.log('🎯 썹픽 모드 활성화:', subwayPickData);
            
            // 재료 정보를 allIngredients에 저장
            setAllIngredients(subwayPickData.ingredients || []);
            
            // selectedIngredients는 빈 객체로 유지 (이미 선택된 상태이므로)
            // 가격 계산 시 subwayPickData.basePrice 사용
        }
    }, [isSubwayPick, subwayPickData]);

    // 세트 메뉴 목록 가져오기
    useEffect(() => {
        getSets()
            .then(response => {
                const sets = Array.isArray(response.data) ? response.data : [];
                setSetMenus(sets);
            })
    }, []);

    // 현재 단계의 재료 가져오기 (썹픽 모드에서는 세트만 가져옴)
    useEffect(() => {
        if (!currentCategory) return;

        if (currentCategory.id === '세트') {
            setIngredients(setMenus);
        } else if (!isSubwayPick) {
            // 썹픽 모드가 아닐 때만 재료 가져오기
            getIngredients(currentCategory.id)
                .then(response => {
                    setIngredients(response.data);
                    setAllIngredients(prev => {
                        const newItems = response.data.filter(
                            newItem => !prev.some(oldItem => oldItem.ingredientId === newItem.ingredientId)
                        );
                        return [...prev, ...newItems];
                    });
                })
        }
    }, [step, isSubwayPick]);

    useEffect(() => {
        if (currentCategory?.id === '세트' && setMenus.length > 0) {
            setIngredients(setMenus);
        }
    }, [setMenus]);

    // 선택된 세트의 구성 요소 가져오기
    useEffect(() => {
        if (selectedSetId && selectedSetId !== 1) {
            getSetDetail(selectedSetId)
                .then(response => {
                    console.log(response);
                    setSetComponents(response.data);
                    
                    const options = response.data.selectableOptions || {};
                    setDrinkOptions(Array.isArray(options.drink) ? options.drink : []);
                    setSideOptions(Array.isArray(options.side) ? options.side : []);
                })
                .catch(err => {
                    setSetComponents(null);
                    setDrinkOptions([]);
                    setSideOptions([]);
                });
        } else {
            setSetComponents(null);
            setDrinkOptions([]);
            setSideOptions([]);
            setSelectedDrink(null);
            setSelectedSide(null);
        }
    }, [selectedSetId]);

    const handleIngredientClick = (ingredient) => {
        const categoryId = currentCategory.id;
        
        if (categoryId === '세트') {
            setSelectedSetId(ingredient.setId);
            setSelectedIngredients(prev => ({
                ...prev,
                [categoryId]: [ingredient.setId]
            }));
            return;
        }

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

    const handleDrinkSelect = (ingredient) => {
        setSelectedDrink(ingredient.ingredientId);
    };

    const handleSideSelect = (ingredient) => {
        setSelectedSide(ingredient.ingredientId);
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

    const handleNextStep = () => {
        const currentSelected = selectedIngredients[currentCategory.id] || [];
        
        if (isRequiredStep && currentSelected.length === 0) {
            alert(`${currentCategory.name}을(를) 선택해주세요! (필수 항목)`);
            return;
        }

        if (currentCategory.id === '세트' && selectedSetId && selectedSetId !== 1) {
            const needsDrink = setComponents?.components?.some(c => c.componentType === 'drink');
            const needsSide = setComponents?.components?.some(c => c.componentType === 'side');

            if (needsDrink && !selectedDrink) {
                alert('음료를 선택해주세요!');
                return;
            }

            if (needsSide && !selectedSide) {
                alert('사이드를 선택해주세요!');
                return;
            }
        }

        if (step < categories.length) {
            setStep(step + 1);
        } else {
            handleAddToCart();
        }
    };

    const handleAddToCart = () => {
        let ingredientIds, selectedDetails, ingredientExtraPrice, basePrice;

        if (isSubwayPick && subwayPickData) {
            // ✅ 썹픽 모드: 미리 선택된 재료 사용
            ingredientIds = subwayPickData.ingredientIds;
            selectedDetails = subwayPickData.ingredients || [];
            ingredientExtraPrice = 0; // 이미 basePrice에 포함됨
            basePrice = subwayPickData.basePrice;
            
            console.log('🎯 썹픽 모드 장바구니 추가:', {
                재료: subwayPickData.ingredientNames,
                기본가격: basePrice,
            });
        } else {
            // 일반 커스텀 모드
            ingredientIds = Object.entries(selectedIngredients)
                .filter(([categoryId, _]) => categoryId !== '세트')
                .flatMap(([_, ids]) => ids);

            selectedDetails = allIngredients.filter(ing => 
                ingredientIds.includes(ing.ingredientId)
            );
            ingredientExtraPrice = selectedDetails.reduce((sum, ing) => sum + (Number(ing.price) || 0), 0);
            basePrice = Number(selectedItem?.price) || 0;
        }

        // 세트 가격 계산 (공통)
        const selectedDrinkData = drinkOptions.find(d => d.ingredientId === selectedDrink);
        const selectedSideData = sideOptions.find(s => s.ingredientId === selectedSide);
        
        const drinkPrice = selectedDrinkData ? (Number(selectedDrinkData.price) || 0) : 0;
        const sidePrice = selectedSideData ? (Number(selectedSideData.price) || 0) : 0;
        
        const setAddPrice = (selectedSetId && selectedSetId !== 1) ? (drinkPrice + sidePrice) : 0;

        // 최종 단가 계산
        const finalUnitPrice = basePrice + ingredientExtraPrice + setAddPrice;

        // 장바구니에 넘길 객체 구성
        const orderItem = {
            productId: isSubwayPick ? subwayPickData.productId : parseInt(itemId),
            itemId: parseInt(itemId),
            itemName: selectedItem?.itemName,
            imgUrl: selectedItem?.imageUrl || selectedItem?.imgUrl,
            quantity: quantity || 1,
            unitPrice: finalUnitPrice,
            price: finalUnitPrice,
            ingredientIds: ingredientIds,
            ingredientName: isSubwayPick 
                ? subwayPickData.ingredientNames 
                : selectedDetails.map(ing => ing.ingredientName),
            size: selectedItem?.size,
            setId: selectedSetId || null,
            selectedDrinkId: selectedDrink || null,
            selectedSideId: selectedSide || null,
            // 가격 분해 정보
            basePrice: basePrice,
            ingredientPrice: ingredientExtraPrice,
            setPrice: setAddPrice,
            drinkPrice: drinkPrice,
            sidePrice: sidePrice,
        };

        console.log("✅ 장바구니 추가 - 최종 금액:", {
            모드: isSubwayPick ? '썹픽' : '커스텀',
            기본가격: basePrice,
            재료추가: ingredientExtraPrice,
            음료가격: drinkPrice,
            사이드가격: sidePrice,
            세트합계: setAddPrice,
            합계: finalUnitPrice
        });

        addToCart(orderItem);
        alert('장바구니에 추가되었습니다!');
        navigate('/cart');
    };

    const getSelectedCount = () => {
        if (currentCategory?.id === '세트') {
            return selectedSetId ? 1 : 0;
        }
        return selectedIngredients[currentCategory?.id]?.length || 0;
    };

    // 세트 구성 요소 선택 UI 렌더링
    const renderSetComponents = () => {
        if (!setComponents || !selectedSetId || selectedSetId === 1) {
            return null;
        }
        const hasDrink = setComponents.components?.some(c => c.componentType === 'drink');
        const hasSide = setComponents.components?.some(c => c.componentType === 'side');

        return (
            <div css={s.setComponentsStyle}>
                {hasSide && sideOptions.length > 0 && (
                    <div css={s.componentSectionStyle}>
                        <h4>사이드 선택</h4>
                        <div css={s.ingredientsGridStyle}>
                            {sideOptions.map(side => (
                                <button 
                                    key={side.ingredientId}
                                    onClick={() => handleSideSelect(side)}
                                    css={[
                                        s.ingredientCardStyle, 
                                        selectedSide === side.ingredientId && s.ingredientCardSelectedStyle
                                    ]}
                                >
                                    <div css={s.ingredientImageWrapperStyle}>
                                        {side.imageUrl && (
                                            <img 
                                                src={side.imageUrl} 
                                                alt={side.ingredientName} 
                                                css={s.ingredientImageStyle} 
                                            />
                                        )}
                                        {selectedSide === side.ingredientId && (
                                            <div css={s.selectedBadgeStyle}>✓</div>
                                        )}
                                    </div>
                                    <div css={s.ingredientInfoStyle}>
                                        <div css={s.ingredientNameStyle}>{side.ingredientName}</div>
                                        <div css={s.ingredientPriceStyle}>
                                            {side.price > 0 ? `+${side.price}원` : "기본"}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {hasDrink && drinkOptions.length > 0 && (
                    <div css={s.componentSectionStyle}>
                        <h4>음료 선택</h4>
                        <div css={s.ingredientsGridStyle}>
                            {drinkOptions.map(drink => (
                                <button 
                                    key={drink.ingredientId}
                                    onClick={() => handleDrinkSelect(drink)}
                                    css={[
                                        s.ingredientCardStyle, 
                                        selectedDrink === drink.ingredientId && s.ingredientCardSelectedStyle
                                    ]}
                                >
                                    <div css={s.ingredientImageWrapperStyle}>
                                        {drink.imageUrl && (
                                            <img 
                                                src={drink.imageUrl} 
                                                alt={drink.ingredientName} 
                                                css={s.ingredientImageStyle} 
                                            />
                                        )}
                                        {selectedDrink === drink.ingredientId && (
                                            <div css={s.selectedBadgeStyle}>✓</div>
                                        )}
                                    </div>
                                    <div css={s.ingredientInfoStyle}>
                                        <div css={s.ingredientNameStyle}>{drink.ingredientName}</div>
                                        <div css={s.ingredientPriceStyle}>
                                            {drink.price > 0 ? `+${drink.price}원` : "기본"}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // ✅ 썹픽 모드일 때 선택된 재료 표시
    const renderSubwayPickInfo = () => {
        if (!isSubwayPick || !subwayPickData) return null;

        return (
            <div style={{
                padding: '15px',
                backgroundColor: '#f0f8ff',
                borderRadius: '8px',
                marginBottom: '20px',
                border: '2px solid #4CAF50'
            }}>
                <div style={{ fontSize: '14px', color: '#666' }}>
                    <strong>재료:</strong> {subwayPickData.ingredientNames?.join(', ')}
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                    <strong>기본 가격:</strong> {subwayPickData.basePrice?.toLocaleString()}원
                </div>
            </div>
        );
    };

    return (
        <div css={s.containerStyle}>
            <div css={s.headerStyle}>
                <button onClick={() => navigate('/menu')} css={s.cancelButtonStyle}>취소</button>
                <h2>
                    {selectedItem?.itemName} {isSubwayPick ? '썹픽 🎯' : '커스텀'}
                </h2>
                <button onClick={() => navigate('/cart')} css={s.cartButtonStyle}>장바구니</button>
            </div>

            <div css={s.progressBarStyle}>
                {categories.map((cat, idx) => (
                    <div key={cat.id} css={[
                        s.progressStepStyle, 
                        (idx + 1) === step && s.progressStepActiveStyle,
                        (idx + 1) < step && s.progressStepDoneStyle,
                        (isSubwayPick && (idx + 1) < 6) && s.progressStepDoneStyle,
                        (categoryName === '샐러드' && (idx + 1) === 1) && s.progressStepSkippedStyle
                    ]}>
                        {cat.name}
                    </div>
                ))}
            </div>

            <div css={s.contentStyle}>
                {/* ✅ 썹픽 정보 표시 */}
                {renderSubwayPickInfo()}

                <div css={s.stepHeaderStyle}>
                    <h3>
                        {step}단계: {currentCategory?.name}
                        <span style={{fontSize: '14px', marginLeft: '10px'}}>
                            ({getSelectedCount()}/{currentCategory?.limit})
                        </span>
                    </h3>
                    
                    {currentCategory?.id === '야채' && !isSubwayPick && (
                        <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button onClick={handleSelectAllVegetables} css={s.actionButtonStyle}>
                                {(selectedIngredients['야채']?.length === ingredients.length) ? "전부 빼기" : "전부 넣기"}
                            </button>
                        </div>
                    )}
                </div>

                <div css={s.ingredientsGridStyle}>
                    {currentCategory?.id === '세트' ? (
                        setMenus.length > 0 ? (
                            setMenus.map(setMenu => {
                                const isSelected = selectedSetId === setMenu.setId;
                                return (
                                    <button 
                                        key={setMenu.setId} 
                                        onClick={() => handleIngredientClick(setMenu)}
                                        css={[s.ingredientCardStyle, isSelected && s.ingredientCardSelectedStyle]}
                                    >
                                        <div css={s.ingredientImageWrapperStyle}>
                                            {isSelected && <div css={s.selectedBadgeStyle}>✓</div>}
                                        </div>
                                        <div css={s.ingredientInfoStyle}>
                                            <div css={s.ingredientNameStyle}>{setMenu.setName}</div>
                                        </div>
                                    </button>
                                );
                            })
                        ) : (
                            <p>세트 메뉴를 불러오는 중...</p>
                        )
                    ) : (
                        !isSubwayPick && ingredients.map(ingredient => {
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
                                        <div css={s.ingredientPriceStyle}>
                                            {ingredient.price > 0 ? `+${ingredient.price}원` : null}
                                        </div>
                                    </div>
                                </button>
                            );
                        })
                    )}
                </div>

                {currentCategory?.id === '세트' && renderSetComponents()}
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