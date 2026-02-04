package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Preset;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PresetMapper {

    /** 사용자 프리셋 목록 */
    List<Preset> findByUserId(@Param("userId") int userId);

    /** 프리셋 삭제 (본인 것만) */
    int deleteById(@Param("presetId") int presetId,
                   @Param("userId") int userId);

    /** presetId → preset 소유자(userId) */
    Integer findUserIdByPresetId(@Param("presetId") Integer presetId);

    /** presetId → productId */
    Integer findProductIdByPresetId(@Param("presetId") Integer presetId);

    /** postId → productId (프리셋 저장용) */
    Integer findProductIdByPostId(@Param("postId") Integer postId);

    /** 중복 저장 체크 */
    boolean existsByUserIdProductIdAndPostedUserId(
            @Param("userId") int userId,
            @Param("productId") int productId,
            @Param("postedUserId") int postedUserId
    );

    /** 포스트 → 프리셋 저장 */
    int insertFromPost(@Param("userId") int userId,
                       @Param("postId") int postId);
}
