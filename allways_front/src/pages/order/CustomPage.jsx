/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

    const categories = [
        { id: '빵', name: '빵', limit: 1, required: true }, 
        { id: '치즈', name: '치즈', limit: 1, required: false },
        { id: '야채', name: '야채', limit: 8, required: false }, 
        { id: '소스', name: '소스', limit: 3, required: false }, 
        { id: '추가', name: '추가', limit: 3, required: false },
    ];
    
    const initialStep = categoryName === '샐러드' ? 2 : 1;
    
    const [step, setStep] = useState(initialStep);
    const [ingredients, setIngredients] = useState([]); 
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [quantity, setQuantity] = useState(1);
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

    const isRequiredStep = currentCategory?.required && !(currentCategory.id === '빵' && categoryName === '샐러드');

    const handleIngredientClick = (ingredient) => {
        const categoryId = currentCategory.id;
        const ingredientId = ingredient.ingredientId;

        setSelectedIngredients(prev => {
            const currentSelected = prev[categoryId] || [];
            
            // 이미 선택된 재료라면 제거 (토글)
            if (currentSelected.includes(ingredientId)) {
                return {
                    ...prev,
                    [categoryId]: currentSelected.filter(id => id !== ingredientId)
                };
            }

            // 새로운 선택 배열 생성
            let newSelection = [...currentSelected];

            // [핵심] 한도 체크: limit에 도달했다면 맨 앞(가장 예전 것) 제거
            if (newSelection.length >= currentCategory.limit) {
                newSelection.shift(); 
            }
            
            // 새 재료 추가
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

    const handleNextStep = () => {
        const currentSelected = selectedIngredients[currentCategory.id] || [];
        
        if (isRequiredStep && currentSelected.length === 0) {
            alert(`${currentCategory.name}을(를) 선택해주세요! (필수 항목)`);
            return;
        }

        if (step < categories.length) {
            setStep(step + 1);
        } else {
            handleAddToCart();
        }
    };

    const handleAddToCart = () => {
        
        const orderItem = {
            itemId: parseInt(itemId),
            itemName: selectedItem?.itemName,
            imgUrl: selectedItem?.imgUrl,
            quantity: quantity,
            ingredientIds: selectedIngredients?.ingredientId,
            ingredientName: selectedIngredients?.ingredientName,
            itemPrice: selectedItem?.price,
        };

        addToCart(orderItem);
        alert('장바구니에 추가되었습니다!');
        navigate('/cart');
    };

    const getSelectedCount = () => selectedIngredients[currentCategory?.id]?.length || 0;

    return (
        <div css={containerStyle}>
            <div css={headerStyle}>
                <button onClick={() => navigate('/menu')} css={cancelButtonStyle}>취소</button>
                <h2>{selectedItem?.itemName} 커스텀</h2>
                <button onClick={() => navigate('/cart')} css={cartButtonStyle}>장바구니</button>
            </div>

            <div css={progressBarStyle}>
                {categories.map((cat, idx) => (
                    <div key={cat.id} css={[
                        progressStepStyle, 
                        (idx + 1) === step && progressStepActiveStyle,
                        (idx + 1) < step && progressStepDoneStyle,
                        (categoryName === '샐러드' && (idx + 1) === 1) && progressStepSkippedStyle
                    ]}>
                        {cat.name}
                    </div>
                ))}
            </div>

            <div css={contentStyle}>
                <div css={stepHeaderStyle}>
                    <h3>
                        {step}단계: {currentCategory?.name} {isRequiredStep ? "(필수)" : "(선택)"}
                        <span style={{fontSize: '14px', marginLeft: '10px'}}>
                            ({getSelectedCount()}/{currentCategory?.limit})
                        </span>
                    </h3>
                    
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {currentCategory?.id === '야채' && (
                            <button onClick={handleSelectAllVegetables} css={actionButtonStyle}>
                                { (selectedIngredients['야채']?.length === ingredients.length) ? "전부 빼기" : "전부 넣기" }
                            </button>
                        )}  
                    </div>
                </div>

                <div css={ingredientsGridStyle}>
                    {ingredients.map(ingredient => {
                        const isSelected = (selectedIngredients[currentCategory.id] || []).includes(ingredient.ingredientId);
                        return (
                            <button 
                                key={ingredient.ingredientId} 
                                onClick={() => handleIngredientClick(ingredient)}
                                css={[ingredientCardStyle, isSelected && ingredientCardSelectedStyle]}
                            >
                                <div css={ingredientImageWrapperStyle}>
                                    <img src={ingredient.imgUrl} alt={ingredient.ingredientName} css={ingredientImageStyle} />
                                    {isSelected && <div css={selectedBadgeStyle}>✓</div>}
                                </div>
                                <div css={ingredientInfoStyle}>
                                    <div css={ingredientNameStyle}>{ingredient.ingredientName}</div>
                                    <div css={ingredientPriceStyle}>{ingredient.price > 0 ? `+${ingredient.price}원` : '무료'}</div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div css={footerStyle}>
                <button 
                    disabled={step <= initialStep} 
                    onClick={() => setStep(step - 1)}
                    css={[navButtonStyle, step <= initialStep && disabledButtonStyle]}
                >
                    이전
                </button>
                <button onClick={handleNextStep} css={[navButtonStyle, nextButtonStyle]}>
                    {step === categories.length ? "장바구니 담기" : "다음"}
                </button>
            </div>
        </div>
    );
}

// --- 스타일 정의 (actionButtonStyle 추가) ---
const actionButtonStyle = css`
    padding: 6px 15px;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 20px;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
    &:hover { background: #e0e0e0; }
`;
// 스타일 정의
const containerStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const headerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-bottom: 2px solid #eee;
    margin-bottom: 20px;
`;

const cancelButtonStyle = css`
    padding: 10px 20px;
    background: #ff4444;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { background: #cc0000; }
`;

const cartButtonStyle = css`
    padding: 10px 20px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    &:hover { background: #45a049; }
`;

const progressBarStyle = css`
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    overflow-x: auto;
`;

const progressStepStyle = css`
    flex: 1;
    padding: 12px;
    background: #f0f0f0;
    text-align: center;
    border-radius: 5px;
    font-weight: bold;
    color: #999;
    min-width: 80px;
`;

const progressStepActiveStyle = css`
    background: #4CAF50;
    color: white;
`;

const progressStepDoneStyle = css`
    background: #2196F3;
    color: white;
`;

const progressStepSkippedStyle = css`
    background: #ddd;
    color: #aaa;
    text-decoration: line-through;
`;

const contentStyle = css`
    flex: 1;
    margin-bottom: 20px;
`;

const stepHeaderStyle = css`
    margin-bottom: 20px;
    text-align: center;
`;

const ingredientsGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
`;

const ingredientCardStyle = css`
    background: white;
    border: 2px solid #ddd;
    border-radius: 10px;
    padding: 15px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
`;

const ingredientCardSelectedStyle = css`
    border-color: #4CAF50;
    background: #f0fff0;
`;

const ingredientImageWrapperStyle = css`
    position: relative;
    margin-bottom: 10px;
`;

const ingredientImageStyle = css`
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 5px;
`;

const selectedBadgeStyle = css`
    position: absolute;
    top: 5px;
    right: 5px;
    background: #4CAF50;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
`;

const ingredientInfoStyle = css`
    text-align: center;
`;

const ingredientNameStyle = css`
    font-weight: bold;
    margin-bottom: 5px;
`;

const ingredientPriceStyle = css`
    color: #4CAF50;
    font-size: 14px;
`;

const quantitySelectorStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin: 30px 0;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
`;

const quantityControlStyle = css`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const quantityButtonStyle = css`
    width: 40px;
    height: 40px;
    border: 2px solid #4CAF50;
    background: white;
    color: #4CAF50;
    border-radius: 5px;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    &:hover {
        background: #4CAF50;
        color: white;
    }
`;

const quantityDisplayStyle = css`
    font-size: 24px;
    font-weight: bold;
    min-width: 40px;
    text-align: center;
`;

const footerStyle = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    border-top: 2px solid #eee;
    position: sticky;
    bottom: 0;
    background: white;
`;

const navButtonStyle = css`
    padding: 15px 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    transition: all 0.3s;
`;

const nextButtonStyle = css`
    background: #4CAF50;
    color: white;
    &:hover { background: #45a049; }
`;

const disabledButtonStyle = css`
    background: #ccc;
    cursor: not-allowed;
    &:hover { background: #ccc; }
`;

const summaryStyle = css`
    font-size: 18px;
    font-weight: bold;
    color: #333;
`;

export default CustomPage;