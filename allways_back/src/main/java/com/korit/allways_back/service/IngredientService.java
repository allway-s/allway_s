package com.korit.allways_back.service;

import com.korit.allways_back.entity.Ingredient;
import com.korit.allways_back.mapper.IngredientMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IngredientService {


    private final IngredientMapper ingredientMapper;

    public List<Ingredient> getIngredientsByCategory(String categoryName) {

        return ingredientMapper.findByCategoryName(categoryName);

    }

}
