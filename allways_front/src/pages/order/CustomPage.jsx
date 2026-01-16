/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react"; 
import { getIngredients } from "../../apis/items/orderApi";
import { useLocation, useNavigate } from "react-router-dom";

function CustomPage() {

    const location = useLocation();
    const categoryName = location.state?.category;

    const [ step, setStep ] = useState(categoryName === '샐러드' ? 2 : 1);
    const [ ingredients, setIngredients ] = useState([]); 

    const navigate = useNavigate();

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

    const handlePrevStep = () => {
        if (categoryName === '샐러드' && step === 2) {
            return;
        }
        setStep(step - 1);
    };

    const handleNextStep = () => {
        if (step < categories.length) {
            setStep(step + 1);
        } else {
            alert("마지막 단계입니다");
        }
    };

    return (
        <>  
            <button onClick={() => navigate(`/menu`)}>
                취소
            </button>
            <button 
                disabled={(categoryName === '샐러드' ? step === 2 : step === 1)} 
                onClick={handlePrevStep}
            >
                이전
            </button>
            
            <div>
                <h3>{step}단계: {currentCategory?.name} 선택</h3>
                <p>메뉴 타입: {categoryName}</p>
                <div>
                    {
                        ingredients.map(item => (
                            <button key={item.ingredientId} onClick={() => console.log(item)}>
                                <img 
                                    src={item.imgUrl} 
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                                />
                                <br/>
                                {item.ingredientName} <br />
                                {item.price} 
                            </button>
                        ))
                    }
                </div>
            </div>

            <button onClick={handleNextStep}>
                {step === categories.length ? "주문 완료" : "다음"}
            </button>
        </>
    );
}

export default CustomPage;