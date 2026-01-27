/** @jsxImportSource @emotion/react */
import  * as s  from "./customPageStyle";
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
        { id: '세트', name: '세트선택', limit: 1, required: true }, 
    ];
    
    const initialStep = categoryName === '샐러드' ? 2 : 1;

    const [sets, setSets] = useState([]);
    const [selectedSet, setSelectedSet] = useState(null);
    
    
    const [step, setStep] = useState(initialStep);
    const [ingredients, setIngredients] = useState([]); 
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [allIngredients, setAllIngredients] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const currentCategory = categories[step - 1];

    const isRequiredStep = currentCategory?.required && !(currentCategory.id === '빵' && categoryName === '샐러드');

    useEffect(() => {
        if (currentCategory) {
            getIngredients(currentCategory.id)
                .then(response => {
                    setIngredients(response.data);
                    setAllIngredients(prev => {
                        const newItems = response.data.filter(
                            newItem => !prev.some(oldItem => oldItem.ingredientId === newItem.ingredientId)
                        )
                        return [...prev, ...newItems];
                    })
                })
                .catch(err => console.error(err));
        }
    }, [step]);


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
        const allSelectedIds = Object.values(selectedIngredients).flat();

        const selectedDetails = allIngredients.filter(ing => 
            allSelectedIds.includes(ing.ingredientId)
        );

        const extraPrice = selectedDetails.reduce((sum, ing) => sum + (ing.price || 0), 0);
        const finalPrice = (selectedItem?.price || 0) + extraPrice;

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
        };

        addToCart(orderItem);
        alert('장바구니에 추가되었습니다!');
        navigate('/cart');
    };

    const getSelectedCount = () => selectedIngredients[currentCategory?.id]?.length || 0;

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

                <div css={s.ingredientsGridStyle}>
                    {ingredients.map(ingredient => {
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
                    })}
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