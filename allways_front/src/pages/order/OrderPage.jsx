/** @jsxImportSource @emotion/react */
import { useState } from "react";

function SelectCard ({}) {
     
}

function SingleSelectStep ({ title, items, value, onSelect }) {
    return (
        <>
            <h2>{title}</h2>
            <div>
                {items.map(item => (
                <SelectCard
                    key={item.id}
                    item={item}
                    selected={value?.id === item.id}
                    onClick={() => onSelect(item)}
                />
                ))}
            </div>
        </>
    )
}

function orderStep ({step}) {
    switch (step) {
        case 1: 
            return <SingleSelectStep>
                
            </SingleSelectStep>
    }
}

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