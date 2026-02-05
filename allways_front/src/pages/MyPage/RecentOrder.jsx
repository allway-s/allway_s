/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { S } from './RecentOrderStyles.js';
import { getUserIdFromToken } from '../../utils/getUserId.js';
import { getOrderHistory, productIngredient } from '../../apis/items/orderApi.js';
import { GetIngredientByCategory } from '../../utils/getIngreByCate.js';
import { savePreset } from '../../apis/items/communityApi.js';

export const RecentOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // ✅ 모달 상태 추가
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [presetName, setPresetName] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = getUserIdFromToken();
            if (!userId) {
                navigate('/login');
                return;
            }

            try {
                setLoading(true);
                const response = await getOrderHistory();
                const rawOrders = response.data;

                // ✅ orderId별로 그룹화
                const groupedByOrderId = rawOrders.reduce((acc, detail) => {
                    const orderId = detail.orderId;

                    if (!acc[orderId]) {
                        acc[orderId] = {
                            orderId: orderId,
                            orderNumber: detail.orderNumber || `ORDER-${orderId}`,
                            date: detail.orderedAt ? detail.orderedAt.split(' ')[0] : "날짜 정보 없음",
                            items: [],
                            totalQuantity: 0,
                            totalPrice: 0
                        };
                    }

                    acc[orderId].items.push(detail);
                    acc[orderId].totalQuantity += detail.quantity || 0;
                    acc[orderId].totalPrice += (detail.unitPrice || 0) * (detail.quantity || 1);

                    return acc;
                }, {});

                const groupedOrders = Object.values(groupedByOrderId);

                // 각 주문의 상품별로 재료 정보 가져오기
                const mappedData = await Promise.all(groupedOrders.map(async (order) => {

                    const itemsWithIngredients = await Promise.all(
                        order.items.map(async (item) => {
                            let ingredientsData = null;

                            if (item.productId) {
                                try {
                                    const res = await productIngredient(item.productId);
                                    ingredientsData = res.data;
                                } catch (error) {
                                    console.error('❌ 재료 정보 로드 실패:', error);
                                }
                            }

                            const fullName = item.setName
                                ? `${item.itemName} (${item.setName})`
                                : item.itemName;

                            return {
                                ...item,
                                ingredients: ingredientsData,
                                fullName: fullName || "상품명 없음"
                            };
                        })
                    );

                    return {
                        ...order,
                        items: itemsWithIngredients
                    };
                }));

                setOrders(mappedData);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                alert('주문 내역을 불러오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [navigate]);

    // ✅ 모달 열기
    const handleOpenModal = (item) => {
        setSelectedItem(item);
        setPresetName(`${item.itemName} 프리셋`);
        setShowModal(true);
    };

    // ✅ 모달 닫기
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setPresetName('');
    };

    // ✅ 프리셋 저장
    const handleSavePreset = async () => {
        if (!presetName.trim()) {
            alert('프리셋 이름을 입력해주세요.');
            return;
        }

        const userId = getUserIdFromToken();
        if (!userId) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        try {
            const presetReqDto = {
                productId: Number(selectedItem.productId),
                presetName: presetName.trim()
            };

            const response = await savePreset(presetReqDto);

            if (response.status === 201 || response.status === 200) {
                alert('내 프리셋에 저장되었습니다!');
                handleCloseModal();
            }
        } catch (error) {
            const errorMsg = error.response?.data || "이미 저장된 프리셋이거나 저장 중 오류가 발생했습니다.";
            alert(errorMsg);
        }
    };

    if (loading) {
        return (
            <div css={S.wrapper}>
                <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
                    주문 내역을 불러오는 중...
                </div>
            </div>
        );
    }

    return (
        <div css={S.wrapper}>
            <div css={S.titleSection}>
                <div css={S.titleContainer}>
                    <h1 css={S.mainTitle}>주문<span>내역</span></h1>
                </div>
            </div>

            <main css={S.historyContainer}>
                {orders.length > 0 ? (
                    orders.map((order, idx) => (
                        <div key={idx} css={S.orderCard}>
                            {/* 주문 헤더 */}
                            <div css={S.orderHeader}>
                                <span className="date">{order.date}</span>
                                <span>{order.orderNumber}</span>
                                <span className="total">
                                    수량: {order.totalQuantity}개 / 합계: {Number(order.totalPrice).toLocaleString()}원
                                </span>
                            </div>

                            {/* 주문에 포함된 모든 상품 표시 */}
                            {order.items.map((item, itemIdx) => (
                                <div key={itemIdx} css={S.itemRow}>
                                    {/* 상품 이미지 */}
                                    <div css={S.itemImage}>
                                            <img
                                                src={item.imgUrl}
                                                alt={item.itemName}
                                                style={{
                                                    width: '120px',
                                                    height: '120px',
                                                    objectFit: 'contain',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                        
                                    </div>

                                    <div css={S.itemInfo}>
                                        <span className="name" style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2d2d2d' }}>
                                            {item.fullName}
                                            {item.size && item.size > 0 && (
                                                <span style={{ fontSize: '0.9rem', color: '#666', marginLeft: '8px' }}>
                                                    ({item.size}cm)
                                                </span>
                                            )}
                                        </span>

                                        {/* 재료 정보 표시 */}
                                        {item.ingredients?.ingredients ? (
                                            <div className="options" style={{ color: '#666', fontSize: '0.95rem', marginTop: '6px' }}>
                                                <div><strong>빵:</strong> {GetIngredientByCategory(item.ingredients.ingredients, 100)}</div>
                                                <div><strong>치즈:</strong> {GetIngredientByCategory(item.ingredients.ingredients, 200)}</div>
                                                <div><strong>야채:</strong> {GetIngredientByCategory(item.ingredients.ingredients, 300)}</div>
                                                <div><strong>소스:</strong> {GetIngredientByCategory(item.ingredients.ingredients, 400)}</div>
                                                <div><strong>추가:</strong> {GetIngredientByCategory(item.ingredients.ingredients, 500)}</div>
                                            </div>
                                        ) : (
                                            <span className="options" style={{ color: '#999', fontSize: '0.9rem', marginTop: '6px', display: 'block' }}>
                                                재료 정보를 불러오는 중...
                                            </span>
                                        )}
                                    </div>

                                    <div css={S.itemActions}>
                                        <span className="price">
                                            {item.quantity}개 × {Number(item.unitPrice).toLocaleString()}원
                                        </span>
                                        <button css={S.saveBtn} onClick={() => handleOpenModal(item)}>
                                            내 프리셋에 저장
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '100px', color: '#888' }}>
                        최근 주문 내역이 없습니다.
                    </div>
                )}
            </main>

            {/* ✅ 프리셋 이름 입력 모달 */}
            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '30px',
                        width: '90%',
                        maxWidth: '400px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}>
                        <h2 style={{
                            margin: '0 0 20px 0',
                            fontSize: '1.5rem',
                            color: '#2d2d2d',
                            textAlign: 'center'
                        }}>
                            프리셋 저장
                        </h2>

                        <p style={{
                            color: '#666',
                            fontSize: '0.95rem',
                            marginBottom: '15px',
                            textAlign: 'center'
                        }}>
                            저장할 프리셋 이름을 입력하세요
                        </p>

                        <input
                            type="text"
                            value={presetName}
                            onChange={(e) => setPresetName(e.target.value)}
                            placeholder="예: 나만의 비엘티"
                            maxLength={50}
                            style={{
                                width: '100%',
                                padding: '12px',
                                fontSize: '1rem',
                                border: '2px solid #e0e0e0',
                                borderRadius: '8px',
                                marginBottom: '20px',
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#009223'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSavePreset();
                                }
                            }}
                        />

                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'space-between'
                        }}>
                            <button
                                onClick={handleCloseModal}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    fontSize: '1rem',
                                    backgroundColor: '#f5f5f5',
                                    color: '#666',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#e0e0e0'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSavePreset}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    fontSize: '1rem',
                                    backgroundColor: '#009223',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: '500',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#007a1c'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#009223'}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentOrder;