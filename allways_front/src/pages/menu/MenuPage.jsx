/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from 'react';
import { getItems } from '../../apis/items/orderApi';
import { useNavigate } from 'react-router-dom';
import { getCartItemCount } from '../../utils/cartStore';

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('샌드위치');
    const [cartCount, setCartCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    
    const navigate = useNavigate();

    const fetchItems = async (category) => {
        try {
            const response = await getItems(category);
            setItems(response.data);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };
    
    const handleCustomClick = (item) => {
        setShowModal(false);
        navigate(`/custom/${item.itemId}`, { 
            state: { 
                category: selectedCategory,
                item: item
            } 
        });
    };

    const handleOpenModal = (item) => {
        setActiveItem(item);
        setShowModal(true);
    };

    const handleSubwayPickClick = (item) => {
    };

    const updateCartCount = () => {
        setCartCount(getCartItemCount());
    };

    useEffect(() => {
        fetchItems(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {
        updateCartCount();
        const interval = setInterval(updateCartCount, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div css={containerStyle}>
            <header css={headerStyle}>
                <h1 css={logoStyle}>MENU</h1>
                <button css={cartButtonStyle} onClick={() => navigate('/cart')}>
                    🛒 장바구니 ({cartCount})
                </button>
            </header>

            <nav css={navStyle}>
                <button 
                    css={[categoryButtonStyle, selectedCategory === '샌드위치' && activeButtonStyle]}
                    onClick={() => setSelectedCategory('샌드위치')}
                >
                    샌드위치
                </button>
                <button 
                    css={[categoryButtonStyle, selectedCategory === '샐러드' && activeButtonStyle]}
                    onClick={() => setSelectedCategory('샐러드')}
                >
                    샐러드
                </button>
                <button 
                    css={[categoryButtonStyle, selectedCategory === '랩' && activeButtonStyle]}
                    onClick={() => setSelectedCategory('랩')}
                >
                    랩
                </button>
            </nav>

            <div css={contentStyle}>
                <h2 css={categoryTitleStyle}>{selectedCategory} 메뉴</h2>
                <div css={menuGridStyle}>
                    {items.map((item) => (
                        <div key={item.itemId} css={menuCardStyle}>
                            <div css={imageWrapperStyle}>
                                <img 
                                    src={item.imgUrl} 
                                    alt={item.itemName}
                                    css={menuImageStyle}
                                />
                            </div>
                            <h3 css={itemNameStyle}>{item.itemName}</h3>
                            <p css={itemDescStyle}>{item.content}</p>
                            <p css={priceStyle}>{item.price?.toLocaleString()}원</p>
                            <div css={buttonGroupStyle}>
                                <button 
                                    css={subwayPickButtonStyle}
                                    onClick={() => handleSubwayPickClick(item)}
                                >
                                    썹픽
                                </button>
                                
                                {selectedCategory !== '랩' && (    
                                    <button 
                                        css={customButtonStyle}
                                        onClick={() => {
                                            if (selectedCategory === '샌드위치') {
                                                handleOpenModal(item);
                                            } else {
                                                handleCustomClick(item);
                                            }
                                        }}
                                    >
                                        커스텀
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && activeItem && (
                <div css={modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div css={modalBodyStyle} onClick={(e) => e.stopPropagation()}>
                        <h3 css={modalTitleStyle}>사이즈 선택</h3>
                        <p css={modalItemNameStyle}>{activeItem.itemName}</p>
                        <div css={modalButtonGroupStyle}>
                            <button 
                                css={sizeButtonStyle}
                                onClick={() => handleCustomClick(activeItem)}
                            >
                                15cm
                            </button>
                            <button 
                                css={sizeButtonStyle}
                                onClick={() => handleCustomClick({
                                    ...activeItem, 
                                    itemId: activeItem.itemId + 1 
                                })}
                            >
                                30cm
                            </button>
                        </div>
                        <button 
                            css={cancelButtonStyle}
                            onClick={() => setShowModal(false)}
                        >
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// 전체 컨테이너
const containerStyle = css`
    min-height: 100vh;
    background: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

// 헤더
const headerStyle = css`
    background: #009223;
    color: white;
    padding: 15px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    /* 고정 설정 */
    position: sticky;
    top: 60px; /* [중요] 전역 헤더의 실제 높이만큼 적어주세요 */
    z-index: 100;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const logoStyle = css`
    margin: 0;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 2px;
`;

const cartButtonStyle = css`
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
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    &:active {
        transform: translateY(0);
    }
`;

// 네비게이션
const navStyle = css`
    background: white;
    padding: 15px 40px;
    display: flex;
    gap: 15px;
    
    /* 고정 설정 */
    position: sticky;
    top: 135px; /* [중요] 전역 헤더 높이 + 메뉴 헤더 높이(약 75px) */
    z-index: 90;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const categoryButtonStyle = css`
    background: white;
    color: #333;
    border: 2px solid #ddd;
    padding: 12px 30px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: #009223;
        color: #009223;
    }
`;

const activeButtonStyle = css`
    background: #009223;
    color: white;
    border-color: #009223;

    &:hover {
        background: #00802b;
        color: white;
    }
`;

// 컨텐츠 영역
const contentStyle = css`
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
`;

const categoryTitleStyle = css`
    font-size: 32px;
    color: #333;
    margin-bottom: 30px;
    font-weight: bold;
`;

// 메뉴 그리드
const menuGridStyle = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
`;

const menuCardStyle = css`
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 16px rgba(0,0,0,0.15);
    }
`;

const imageWrapperStyle = css`
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 10px;
    margin-bottom: 15px;
    background: #f9f9f9;
`;

const menuImageStyle = css`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const itemNameStyle = css`
    font-size: 20px;
    color: #333;
    margin: 15px 0 10px 0;
    font-weight: bold;
`;

const itemDescStyle = css`
    font-size: 14px;
    color: #666;
    line-height: 1.5;
    margin: 10px 0;
    min-height: 40px;
`;

const priceStyle = css`
    font-size: 22px;
    color: #009223;
    font-weight: bold;
    margin: 15px 0;
`;

// 버튼 그룹
const buttonGroupStyle = css`
    display: flex;
    gap: 10px;
    margin-top: 15px;
`;

const subwayPickButtonStyle = css`
    flex: 1;
    background: #FFC600;
    color: #333;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #FFD633;
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;

const customButtonStyle = css`
    flex: 1;
    background: #009223;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #00802b;
        transform: scale(1.02);
    }

    &:active {
        transform: scale(0.98);
    }
`;

// 모달
const modalOverlayStyle = css`
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%;
    background: rgba(0,0,0,0.6); 
    display: flex; 
    align-items: center; 
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
`;

const modalBodyStyle = css`
    background: white; 
    padding: 40px; 
    border-radius: 20px; 
    text-align: center;
    min-width: 350px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
    animation: slideUp 0.3s ease;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const modalTitleStyle = css`
    font-size: 24px;
    color: #333;
    margin: 0 0 10px 0;
    font-weight: bold;
`;

const modalItemNameStyle = css`
    font-size: 16px;
    color: #666;
    margin: 0 0 25px 0;
`;

const modalButtonGroupStyle = css`
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 20px;
`;

const sizeButtonStyle = css`
    flex: 1;
    background: #009223;
    color: white;
    border: none;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #00802b;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
`;

const cancelButtonStyle = css`
    background: #f5f5f5;
    color: #666;
    border: none;
    padding: 12px 30px;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #e5e5e5;
    }
`;

export default MenuPage;    