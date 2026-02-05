/** @jsxImportSource @emotion/react */
import * as s from "./menuPageStyle";
import { useState, useEffect } from "react";
import { getItems, getSubwayPick } from "../../apis/items/menuApi";
import { useNavigate } from "react-router-dom";

const MenuPage = () => {
    const navigate = useNavigate();

    // 데이터 상태
    const [items, setItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("샌드위치");

    // 모달 및 액션 제어
    const [showModal, setShowModal] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [actionType, setActionType] = useState(null); // 'CUSTOM' | 'SUBWAY_PICK'

    // 로딩 상태
    const [pickLoading, setPickLoading] = useState(false);

    // 15cm 또는 사이즈 정보가 없는 아이템만 메인 그리드에 노출
    const displayItems = items.filter(
        item => item.size === 15 || !item.size
    );

    // 데이터 페칭
    const fetchItems = async (category) => {
        try {
            const response = await getItems(category);
            setItems(response.data);
        } catch (error) {
            console.error("데이터 로드 실패:", error);
        }
    };

    useEffect(() => {
        fetchItems(selectedCategory);
        window.scrollTo(0, 0); 
    }, [selectedCategory]);

    // 30cm 아이템 찾기 (샌드위치용)
    const get30cmVariant = (baseItem) => {
        return items.find(
            i => i.itemName === baseItem.itemName && i.size === 30
        );
    };

    // [로직] 커스텀 페이지 이동
    const goCustom = (item) => {
        navigate(`/custom/${item.itemId}`, {
            state: {
                category: selectedCategory,
                item,
            },
        });
    };

    // [로직] 썹픽(시스템 레시피) 데이터 조회 및 이동
    const goSubwayPick = async (item) => {
        if (pickLoading) return;
        setPickLoading(true);
        try {
            const response = await getSubwayPick(item.itemId);
            const pickData = response.data;

            navigate(`/custom/${item.itemId}`, {
                state: {
                    category: selectedCategory,
                    item: item,
                    isSubwayPick: true,
                    subwayPickData: {
                        productId: pickData.productId,
                        ingredients: pickData.ingredients,
                        ingredientIds: pickData.ingredients.map(i => i.ingredientId),
                        ingredientNames: pickData.ingredients.map(i => i.ingredientName),
                        basePrice: pickData.totalPrice,
                    }
                }
            });
        } catch (error) {
            console.error("❌ 썹픽 불러오기 실패:", error);
        } finally {
            setPickLoading(false);
        }
    };

    /**
     * 핵심 수정 포인트: 버튼 클릭 시 카테고리별 분기 처리
     * 샌드위치면 모달 오픈, 아니면 즉시 실행
     */
    const handleActionClick = (item, type) => {
        setActiveItem(item);
        setActionType(type);

        if (selectedCategory === "샌드위치") {
            // 샌드위치일 때만 사이즈 선택 모달을 띄움
            setShowModal(true);
        } else {
            // 샐러드, 랩 등은 사이즈 선택 없이 즉시 이동
            if (type === "CUSTOM") {
                goCustom(item);
            } else {
                goSubwayPick(item);
            }
        }
    };

    // 모달 내 사이즈 선택 완료 시 호출
    const handleSizeSelect = async (size) => {
        let targetItem = size === 30 ? get30cmVariant(activeItem) : activeItem;
        setShowModal(false);

        if (actionType === "CUSTOM") {
            goCustom(targetItem);
        } else {
            await goSubwayPick(targetItem);
        }
    };

    return (
        <div css={s.containerStyle}>
            {/* 카테고리 탭 */}
            <nav css={s.navStyle}>
                {["샌드위치", "샐러드", "랩"].map(category => (
                    <button
                        key={category}
                        css={[
                            s.categoryButtonStyle,
                            selectedCategory === category && s.activeButtonStyle,
                        ]}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </nav>

            <div css={s.contentStyle}>
                <h2 css={s.categoryTitleStyle}>{selectedCategory}</h2>

                {/* 메뉴 카드 그리드 */}
                <div css={s.menuGridStyle}>
                    {displayItems.map(item => (
                        <div key={item.itemId} css={s.menuCardStyle}>
                            <div css={s.imageWrapperStyle}>
                                <img src={item.imageUrl} alt={item.itemName} css={s.menuImageStyle} />
                            </div>

                            <h3 css={s.itemNameStyle}>{item.itemName}</h3>
                            <p css={s.itemDescStyle}>{item.description}</p>
                            <p css={s.priceStyle}>{item.price?.toLocaleString()}원</p>

                            <div css={s.buttonGroupStyle}>
                                <button
                                    css={s.subwayPickButtonStyle}
                                    disabled={pickLoading}
                                    onClick={() => handleActionClick(item, "SUBWAY_PICK")}
                                >
                                    {pickLoading ? "로딩중..." : "썹픽"}
                                </button>

                                {selectedCategory !== "랩" && (
                                    <button
                                        css={s.customButtonStyle}
                                        onClick={() => handleActionClick(item, "CUSTOM")}
                                    >
                                        커스텀
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 사이즈 선택 모달 (샌드위치 카테고리 전용) */}
            {showModal && activeItem && (
                <div css={s.modalOverlayStyle} onClick={() => setShowModal(false)}>
                    <div css={s.modalBodyStyle} onClick={e => e.stopPropagation()}>
                        <h3 css={s.modalTitleStyle}>사이즈 선택</h3>
                        <p css={s.modalItemNameStyle}>{activeItem.itemName}</p>
                        <div css={s.modalButtonGroupStyle}>
                            <button css={s.sizeButtonStyle} onClick={() => handleSizeSelect(15)}>
                                15cm
                            </button>
                            <button css={s.sizeButtonStyle} onClick={() => handleSizeSelect(30)}>
                                30cm
                            </button>
                        </div>

                        <button css={s.cancelButtonStyle} onClick={() => setShowModal(false)}>
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuPage;