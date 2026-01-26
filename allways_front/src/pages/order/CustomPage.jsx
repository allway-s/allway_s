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

    const [selectedSet, setSelectedSet] = useState(null); 
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [selectedSide, setSelectedSide] = useState(null);
    const [drinks, setDrinks] = useState([]);
    const [wedges, setWedges] = useState([]); 
    const [chips, setChips] = useState([]);  
    const [cookies, setCookies] = useState([]); 
    const [soups, setSoups] = useState([]);   
    
    const [cachedIngredients, setCachedIngredients] = useState({});

    const categories = [
        { id: '빵', name: '빵', limit: 1, required: true }, 
        { id: '치즈', name: '치즈', limit: 1, required: false },
        { id: '야채', name: '야채', limit: 8, required: false }, 
        { id: '소스', name: '소스', limit: 3, required: false }, 
        { id: '추가', name: '추가', limit: 3, required: false },
        { id: '세트', name: '세트 선택', limit: 1, required: false },
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


    useEffect(() => {
        if (currentCategory?.id === '세트') {
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
            const categoryId = currentCategory.id;
            
            if (cachedIngredients[categoryId]) {
                setIngredients(cachedIngredients[categoryId]);
            } else {
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

    const handleSetSelection = (setOption) => {
        setSelectedSet(setOption.id);
        
        if (setOption.id !== 'single' && drinks.length > 0) {
            setSelectedDrink(drinks[0]);
        } else {
            setSelectedDrink(null);
        }
        
        setSelectedSide(null);
    };

    const handleNextStep = () => {
        const currentSelected = selectedIngredients[currentCategory.id] || [];
        
        if (currentCategory.id !== '세트' && isRequiredStep && currentSelected.length === 0) {
            alert(`${currentCategory.name}을(를) 선택해주세요! (필수 항목)`);
            return;
        }

        if (currentCategory.id === '세트') {
            if (!selectedSet) {
                alert('단품 또는 세트를 선택해주세요!');
                return;
            }
            
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

    const handleAddToCart = () => {
        const allSelectedIds = Object.values(selectedIngredients).flat();
        const selectedDetails = allIngredients.filter(ing => 
            allSelectedIds.includes(ing.ingredientId)
        );

        const extraPrice = selectedDetails.reduce((sum, ing) => sum + (ing.price || 0), 0);
        
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
                                    {setOption.price > 0 ? `+${setOption.price.toLocaleString()}원` : ''}
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
                                                {side.price > 0 ? `+${side.price}원` : ''}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                            <div style={{ marginTop: '30px' }}>
                            <h4>음료 선택</h4>
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
                                                {drink.price > 0 ? `+${drink.price}원` : ''}
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
                        {step}단계: {currentCategory?.name}
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
                                            {ingredient.price > 0 ? `+${ingredient.price}원` : ''}
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