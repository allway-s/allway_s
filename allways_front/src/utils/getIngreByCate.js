export const GetIngredientByCategory = (data, rangeStart) => {
    // 1. 데이터가 아예 없으면 리턴
    if (!data) return "선택 안함";

    let names = [];

    // [케이스 A] 서버 데이터 (객체 배열: [{ingredientId: 101, ingredientName: '...'}])
    if (Array.isArray(data)) {
        names = data
            .filter(ing => ing.ingredientId >= rangeStart && ing.ingredientId < rangeStart + 100)
            .map(ing => ing.ingredientName);
    } 
    // [케이스 B] 장바구니 데이터 (객체 형태: { ingredientIds: [], ingredientName: [] })
    else if (data.ingredientIds && data.ingredientName) {
        names = data.ingredientIds
            .map((id, index) => (id >= rangeStart && id < rangeStart + 100 ? data.ingredientName[index] : null))
            .filter(Boolean);
    }

    return names.length > 0 ? names.join(", ") : "선택 안함";
};