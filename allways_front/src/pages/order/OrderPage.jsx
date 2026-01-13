/** @jsxImportSource @emotion/react */
import { useState } from "react";



function OrderPage() {

    const [ step, setStep ] = useState(1);

    const categories = [
        { id: 'bread', name: '빵', type: 'single' }, 
        { id: 'cheese', name: '치즈', type: 'single' },
        { id: 'veggies', name: '채소', type: 'multiple', limit: 3 }, 
        { id: 'sauce', name: '소스', type: 'multiple', limit: 2 }, 
        { id: 'extra', name: '추가', type: 'multiple'},
        { id: 'set', name: '세트', type: 'single'}
    ];

    const [ cart, setCart ] = useState({
        bread: null,
        cheese: null,
        veggies: [],
        sauce: [],
        extra: [],
        set: null,
    }); 

    const handleSelect = () => {
        
        setCart((prev) => {
            if (type === 'single') {
                return {
                    ...prev
                }
            }
        })
        
    }


    return<>

        <button 
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
        >
            이전    
        </button>
        <button 
            onClick={() => setStep(step + 1)}
        >
            다음
        </button>
        
    </>

}

export default OrderPage;