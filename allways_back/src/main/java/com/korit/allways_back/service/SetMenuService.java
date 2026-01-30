package com.korit.allways_back.service;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.entity.SetComponent;
import com.korit.allways_back.entity.SetMenu;
import com.korit.allways_back.mapper.SetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SetMenuService {

    private final SetMapper setMapper;

    /**
     * 모든 세트 메뉴 조회
     */
    public List<SetMenu> getAllSets() {
        return setMapper.findAllSets();
    }

    /**
     * 세트 ID로 세트 메뉴 조회
     */
    public SetMenu getSetById(Integer setId) {
        SetMenu setMenu = setMapper.findById(setId);
        if (setMenu == null) {
            throw new IllegalArgumentException("존재하지 않는 세트입니다.");
        }
        return setMenu;
    }
    /**
     * ingredient 가격 조회
     */
    public int getIngredientPrice(Integer ingredientId) {
        if (ingredientId == null) return 0;

        // SetMapper에 메서드 추가 필요
        Integer price = setMapper.findIngredientPrice(ingredientId);
        return price != null ? price : 0;
    }
    /**
     * 세트 ID로 구성요소 조회
     */
    public List<SetComponent> getSetComponents(Integer setId) {
        return setMapper.findComponentsBySetId(setId);
    }

    public Map<String, Object> getSetMenuDetail(Integer setId) {
        SetMenu setMenu = getSetById(setId);
        List<SetComponent> components = setMapper.findComponentsBySetId(setId);

        // 각 구성요소별 선택 가능한 재료 조회
        Map<String, List<Ingredient>> selectableOptions = new HashMap<>();
        for (SetComponent component : components) {
            if (component.getCategoryId() != null) {
                List<Ingredient> ingredients = setMapper.findSelectableIngredients(component.getCategoryId());
                selectableOptions.put(component.getComponentType().toString(), ingredients);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("setMenu", setMenu);
        result.put("components", components);
        result.put("selectableOptions", selectableOptions);

        return result;
    }

    public List<Ingredient> getSelectableIngredients(Integer categoryId) {
        return setMapper.findSelectableIngredients(categoryId);
    }

    public boolean validateSetSelection(Integer setId, Integer selectedDrinkId, Integer selectedSideId) {
        List<SetComponent> components = setMapper.findComponentsBySetId(setId);

        boolean drinkValid = false;
        boolean sideValid = false;

        for (SetComponent component : components) {
            if (component.getCategoryId() != null) {
                List<Ingredient> ingredients = setMapper.findSelectableIngredients(component.getCategoryId());

                if ("drink".equals(component.getComponentType().toString())) {
                    drinkValid = ingredients.stream()
                            .anyMatch(ing -> ing.getIngredientId().equals(selectedDrinkId));
                } else if ("side".equals(component.getComponentType().toString())) {
                    sideValid = ingredients.stream()
                            .anyMatch(ing -> ing.getIngredientId().equals(selectedSideId));
                }
            }
        }

        return drinkValid && sideValid;
    }
}