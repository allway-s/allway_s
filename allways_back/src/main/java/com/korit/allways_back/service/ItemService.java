package com.korit.allways_back.service;

import com.korit.allways_back.entity.Item;
import com.korit.allways_back.mapper.ItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemMapper itemMapper;

    public List<Item> getItemByCategory(String categoryName) {

        return itemMapper.findByCategoryName(categoryName);

    }


}
