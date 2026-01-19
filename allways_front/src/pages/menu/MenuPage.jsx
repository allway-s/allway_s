import { useState, useEffect } from 'react';
import { getItems } from '../../apis/items/orderApi';
import { useNavigate } from 'react-router-dom';
import { getCartItemCount } from '../../utils/cartStore';

const MenuPage = () => {
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('샌드위치');
    const [cartCount, setCartCount] = useState(0);
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
        navigate(`/custom/${item.itemId}`, { 
            state: { 
                category: selectedCategory,
                item: item
            } 
        });
    };

    const handleSubwayPickClick = (item) => {
        alert('써브웨이 픽 기능은 구현 예정입니다.');
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
        <div>
            <header>
                <h1>SUBWAY 메뉴판</h1>
                <button onClick={() => navigate('/cart')}>
                    🛒 장바구니 ({cartCount})
                </button>
            </header>

            <nav>
                <button onClick={() => setSelectedCategory('샌드위치')}>샌드위치</button>
                <button onClick={() => setSelectedCategory('샐러드')}>샐러드</button>
                <button onClick={() => setSelectedCategory('랩')}>랩</button>
            </nav>

            <div>
                <h2>{selectedCategory} 메뉴</h2>
                <div>
                    {items.map((item) => (
                        <div key={item.itemId}>
                            <img 
                                src={item.imgUrl} 
                                alt={item.itemName}
                                style={{ width: '300px' }}
                            />
                            <h3>{item.itemName}</h3>
                            <p>{item.content}</p>
                            <p>{item.price?.toLocaleString()}원</p>
                            <div>
                                <button onClick={() => handleSubwayPickClick(item)}>
                                    써브픽
                                </button>
                                {selectedCategory !== '랩' && (
                                    <button onClick={() => handleCustomClick(item)}>
                                        커스텀
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MenuPage;