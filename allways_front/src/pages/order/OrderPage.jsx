/** @jsxImportSource @emotion/react */
import { useState } from "react";



function OrderPage() {

    const [ step, setStep ] = useState(1);

    const [ cart, setCart ] = useState({
        bread: null,
        cheese: null,
        veggies: [],
        sauce: [],
        extra: [],
        set: null
    }); 

    const handleSelectSingle = (key, value) => {
        setCart(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSelectMulti = (key, value) => {
        setCart(prev => {
            const exists = prev[key].some(v => v.id === value.id);
            return {
                ...prev,
                [key]: exists
                    ? prev[key].filter(v => v.id !== value.id)
                    : [...prev[key], value]
            };            
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