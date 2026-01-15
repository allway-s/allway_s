/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react"; 
import { getIngredients } from "../../apis/items/orderApi";

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
        <>
            <button disabled={step === 1} onClick={() => setStep(step - 1)}>
                이전
            </button>
            
            <div>
                <h3>{step}단계: {currentCategory?.name} 선택</h3>
                <div>
                    {ingredients.length > 0 ? (
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
                    ) : (
                        <p>재료를 불러오는 중이거나 데이터가 없습니다.</p>
                    )}
                </div>
            </div>

            <button onClick={handleNextStep}>
                {step === categories.length ? "주문 완료" : "다음"}
            </button>
        </>
    );
}

export default CustomPage;