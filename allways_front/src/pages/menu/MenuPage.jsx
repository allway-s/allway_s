/** @jsxImportSource @emotion/react */
import  * as s  from "./menuPageStyle";
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
        <div css={s.containerStyle}>
            <header css={s.headerStyle}>
                <h1 css={s.logoStyle}>MENU</h1>
                <button css={s.cartButtonStyle} onClick={() => navigate('/cart')}>
                    🛒 장바구니 ({cartCount})
                </button>
            </header>

            <nav css={s.navStyle}>
                <button 
                    css={[s.categoryButtonStyle, selectedCategory === '샌드위치' && s.activeButtonStyle]}
                    onClick={() => setSelectedCategory('샌드위치')}
                >
                    샌드위치
                </button>
                <button 
                    css={[s.categoryButtonStyle, selectedCategory === '샐러드' && s.activeButtonStyle]}
                    onClick={() => setSelectedCategory('샐러드')}
                >
                    샐러드
                </button>
                <button 
                    css={[s.categoryButtonStyle, selectedCategory === '랩' && s.activeButtonStyle]}
                    onClick={() => setSelectedCategory('랩')}
                >
                    랩
                </button>
            </nav>

            <div css={s.contentStyle}>
                <h2 css={s.categoryTitleStyle}>{selectedCategory} 메뉴</h2>
                <div css={s.menuGridStyle}>
                    {items.map((item) => (
                        <div key={item.itemId} css={s.menuCardStyle}>
                            <div css={s.imageWrapperStyle}>
                                <img 
                                    src={item.imgUrl} 
                                    alt={item.itemName}
                                    css={s.menuImageStyle}
                                />
                            </div>
                            <h3 css={s.itemNameStyle}>{item.itemName}</h3>
                            <p css={s.itemDescStyle}>{item.content}</p>
                            <p css={s.priceStyle}>{item.price?.toLocaleString()}원</p>
                            <div css={s.buttonGroupStyle}>
                                <button 
                                    css={s.subwayPickButtonStyle}
                                    onClick={() => handleSubwayPickClick(item)}
                                >
                                    썹픽
                                </button>
                                
                                {selectedCategory !== '랩' && (    
                                    <button 
                                        css={s.customButtonStyle}
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
                <div css={s.modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div css={s.modalBodyStyle} onClick={(e) => e.stopPropagation()}>
                        <h3 css={s.modalTitleStyle}>사이즈 선택</h3>
                        <p css={s.modalItemNameStyle}>{activeItem.itemName}</p>
                        <div css={s.modalButtonGroupStyle}>
                            <button 
                                css={s.sizeButtonStyle}
                                onClick={() => handleCustomClick(activeItem)}
                            >
                                15cm
                            </button>
                            <button 
                                css={s.sizeButtonStyle}
                                onClick={() => handleCustomClick({
                                    ...activeItem, 
                                    itemId: activeItem.itemId + 1 
                                })}
                            >
                                30cm
                            </button>
                        </div>
                        <button 
                            css={s.cancelButtonStyle}
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



export default MenuPage;    