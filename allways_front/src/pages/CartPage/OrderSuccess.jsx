/** @jsxImportSource @emotion/react */
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    

    if (!location.state || !location.state.fromPayment) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
    }

    return (
    <div css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 80px);
        width: 100%;
        text-align: center;

        h1 {
            font-size: 4.5rem;
            margin-bottom: 20px;
            font-weight: 800;
        }

        p {
            font-size: 2.5rem;
            color: #555;
        }

        button {
            background: #FFC600;
            color: #333;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                background: #FFD633;
            }
        }
    `}>
        <div>
           <h1>🎉 주문이 완료되었습니다!</h1>
            <p>주문 번호: {location.state.orderNumber}</p> 
            <br />
            <button onClick={() => navigate("/", { replace: true })}>HOME</button>
        </div>
    </div>
    );
};

export default OrderSuccess;