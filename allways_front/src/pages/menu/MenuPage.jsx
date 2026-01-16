
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getItems } from '../../apis/items/orderApi';
import { useNavigate } from 'react-router-dom';

const ItemCategoryPage = () => {

    // 서버에서 받은 아이템 리스트 저장
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('샌드위치');

    const navigate = useNavigate();

    // ItemController에 데이터를 요청 (백엔드)
    const fetchItems = async (category) => {
        try {
            const response = await getItems(category);
            setItems(response.data);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };
    
    const handleCustomClick = (item) => {
      if (selectedCategory === '샐러드') {
        
      }
    }

    useEffect(() => {
        fetchItems(selectedCategory);
    }, [selectedCategory]);

    return (
        <div>
            <h1>메뉴판</h1>
            <nav>
                <button onClick={() => setSelectedCategory('샌드위치')}>샌드위치</button>
                <button onClick={() => setSelectedCategory('샐러드')}>샐러드</button>
                <button onClick={() => setSelectedCategory('랩')}>랩</button>
            </nav>
            <hr />
            <div>
                <h2>{selectedCategory} 목록</h2>
                {
                    items.map((item) => (
                        <div key={item.itemId}>
                            <img src={item.imgUrl} alt={item.itemName} width="300" />
                            <h3>{item.itemName}</h3>
                            <p>가격: {item.price}원</p>
                            <div className="hover-overlay">
                              <button >썹픽</button>
                              {selectedCategory !== '랩' && (
                                  <button 
                                      onClick={() => navigate(`/custom-page`, { state: { item } })}
                                  >
                                      커스텀
                                  </button>
                              )}
                          </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default ItemCategoryPage;