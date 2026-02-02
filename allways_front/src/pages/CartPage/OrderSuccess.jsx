import { useLocation, Navigate } from 'react-router-dom';

const OrderSuccess = () => {
    const location = useLocation();

    if (!location.state || !location.state.fromPayment) {
    alert("잘못된 접근입니다.");
    return <Navigate to="/" replace />;
    }

    return (
    <div>
        <h1>🎉 주문 완료!</h1>
        <p>주문 번호: {location.state.orderNumber}</p>
    </div>
    );
};

export default OrderSuccess