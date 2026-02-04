package com.korit.allways_back.service;

import com.korit.allways_back.entity.Post;
import com.korit.allways_back.entity.Preset;
import com.korit.allways_back.mapper.PostMapper;
import com.korit.allways_back.mapper.PresetMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@RequiredArgsConstructor
public class PresetService {

    private final PresetMapper presetMapper;
    private final PostMapper postMapper;

    /**
     * 포스트를 내 프리셋으로 저장
     */
    @Transactional
    public void savePresetFromPost(int userId, Integer postId) {

        // 1️⃣ postId → productId
        Integer productId = presetMapper.findProductIdByPostId(postId);
        if (productId == null) {
            throw new IllegalArgumentException("존재하지 않는 게시글입니다.");
        }

        // 2️⃣ postId → 게시글 작성자
        Integer postedUserId = postMapper.findPostedUserIdByPostId(postId);

        // 3️⃣ 중복 저장 방지
        if (presetMapper.existsByUserIdProductIdAndPostedUserId(
                userId, productId, postedUserId)) {
            throw new IllegalStateException("이미 저장한 포스트입니다.");
        }

        // 4️⃣ 프리셋 저장
        int result = presetMapper.insertFromPost(userId, postId);
        if (result == 0) {
            throw new IllegalStateException("프리셋 저장에 실패했습니다.");
        }
    }

    /**
     * 사용자 프리셋 목록
     */
    public List<Preset> findByUserId(int userId) {
        return presetMapper.findByUserId(userId);
    }

    /**
     * 프리셋 삭제 (본인 것만)
     */
    @Transactional
    public void deleteById(int presetId, int userId) {
        int deleted = presetMapper.deleteById(presetId, userId);
        if (deleted == 0) {
            throw new IllegalArgumentException("삭제할 수 없습니다.");
        }
    }
}
