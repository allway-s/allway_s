/** @jsxImportSource @emotion/react */
import * as s from "./menuPageStyle";
import { useState, useEffect } from "react";
import { getItems, getSubwayPick } from "../../apis/items/menuApi";
import { useNavigate } from "react-router-dom";
import { ScrollToTop } from "../../utils/scrollToTop";

const MenuPage = () => {
    const navigate = useNavigate();

    // 데이터
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("샌드위치");

    // 모달 관련
    const [showModal, setShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [actionType, setActionType] = useState(null); 
    // 'CUSTOM' | 'SUBWAY_PICK'

    // 썹픽 로딩
    const [pickLoading, setPickLoading] = useState(false);

    // 15cm만 메뉴에 노출
    const displayItems = items.filter(
        item => item.size === 15 || !item.size
    );

    // 아이템 조회
    const fetchItems = async (category) => {
        try {
            const response = await getItems(category);
            setItems(response.data);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

    // 카테고리 바뀌면 스크롤 초기화
    useEffect(() => {
        fetchItems(selectedCategory);
        window.scrollTo(0, 0); 
    }, [selectedCategory]);

    // 30cm variant 찾기
    const get30cmVariant = (baseItem) => {
        return items.find(
            i => i.itemName === baseItem.itemName && i.size === 30
        );
    };

    // 커스텀 이동
    const goCustom = (item) => {
        navigate(`/custom/${item.itemId}`, {
            state: {
                category: selectedCategory,
                item,
            },
        });
    };

    // 썹픽 처리 - 세트 선택 페이지로 이동
    const goSubwayPick = async (item) => {
        if (pickLoading) return;

        setPickLoading(true);
        try {
            const response = await getSubwayPick(item.itemId);
            const pickData = response.data;

            // 세트 선택 페이지로 이동 (재료는 이미 선택된 상태)
            navigate(`/custom/${item.itemId}`, {
                state: {
                    category: selectedCategory,
                    item: item,
                    // 썹픽 모드 활성화
                    isSubwayPick: true,
                    subwayPickData: {
                        productId: pickData.productId,
                        ingredients: pickData.ingredients,
                        ingredientIds: pickData.ingredients.map(i => i.ingredientId),
                        ingredientNames: pickData.ingredients.map(i => i.ingredientName),
                        basePrice: pickData.totalPrice, // 재료까지 포함된 가격
                    }
                }
            });
        } catch (error) {
            console.error("❌ 썹픽 불러오기 실패:", error);
            alert("썹픽 불러오기에 실패했습니다.");
        } finally {
            setPickLoading(false);
        }
    };

    // 사이즈 선택 공통 처리
    const handleSizeSelect = async (size) => {
        let targetItem =
            size === 30 ? get30cmVariant(activeItem) : activeItem;

        setShowModal(false);

        if (!targetItem) {
            alert("해당 사이즈 상품이 없습니다.");
            return;
        }

        if (actionType === "CUSTOM") {
            goCustom(targetItem);
            return;
        }

        if (actionType === "SUBWAY_PICK") {
            await goSubwayPick(targetItem);
        }
    };

    return (
        <div css={s.containerStyle}>
            {/* 카테고리 */}
            <nav css={s.navStyle}>
                {["샌드위치", "샐러드", "랩"].map(category => (
                    <button
                        key={category}
                        css={[
                            s.categoryButtonStyle,
                            selectedCategory === category &&
                                s.activeButtonStyle,
                        ]}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </nav>

            {/* 메뉴 */}
            <div css={s.contentStyle}>
                <h2 css={s.categoryTitleStyle}>{selectedCategory}</h2>

                <div css={s.menuGridStyle}>
                    {displayItems.map(item => (
                        <div key={item.itemId} css={s.menuCardStyle}>
                            <div css={s.imageWrapperStyle}>
                                <img
                                    src={item.imageUrl}
                                    alt={item.itemName}
                                    css={s.menuImageStyle}
                                />
                            </div>

                            <h3 css={s.itemNameStyle}>{item.itemName}</h3>
                            <p css={s.itemDescStyle}>{item.description}</p>
                            <p css={s.priceStyle}>
                                {item.price?.toLocaleString()}원
                            </p>

                            <div css={s.buttonGroupStyle}>
                                {/* 썹픽 */}
                                <button
                                    css={s.subwayPickButtonStyle}
                                    disabled={pickLoading}
                                    onClick={() => {
                                        setActiveItem(item);
                                        setActionType("SUBWAY_PICK");
                                        setShowModal(true);
                                    }}
                                >
                                    {pickLoading ? "로딩중..." : "썹픽"}
                                </button>

                                {/* 커스텀 */}
                                {selectedCategory !== "랩" && (
                                    <button
                                        css={s.customButtonStyle}
                                        onClick={() => {
                                            setActiveItem(item);
                                            setActionType("CUSTOM");
                                            setShowModal(true);
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

            {/* 사이즈 선택 모달 */}
            {showModal && activeItem && (
                <div
                    css={s.modalOverlayStyle}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        css={s.modalBodyStyle}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 css={s.modalTitleStyle}>사이즈 선택</h3>
                        <p css={s.modalItemNameStyle}>
                            {activeItem.itemName}
                        </p>

                        <div css={s.modalButtonGroupStyle}>
                            <button
                                css={s.sizeButtonStyle}
                                onClick={() => handleSizeSelect(15)}
                            >
                                15cm
                            </button>
                            <button
                                css={s.sizeButtonStyle}
                                onClick={() => handleSizeSelect(30)}
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