package com.korit.allways_back.mapper;

import com.korit.allways_back.entity.Preset;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface PresetMapper {

    /** 프리셋 생성 */
    int insert(Preset preset);

    /** 포스트에서 프리셋 생성 */
    int insertFromPost(Preset preset);

    /** 사용자 ID로 프리셋 목록 조회 */
    List<Preset> findByUserId(@Param("userId") Integer userId);

    /** 프리셋 ID로 조회 */
    Preset findById(@Param("presetId") Integer presetId);

    /** ✅ Soft Delete (is_deleted = 1) */
    int deleteById(@Param("presetId") Integer presetId,
                   @Param("userId") Integer userId);

    /** 사용자의 프리셋 개수 조회 */
    int countByUserId(@Param("userId") Integer userId);

    /** 동일 상품 프리셋 존재 여부 */
    boolean existsByUserIdAndProductId(@Param("userId") Integer userId,
                                       @Param("productId") Integer productId);

    /** 동일 포스트 프리셋 존재 여부 */
    boolean existsByUserIdProductIdAndPostedUserId(
            @Param("userId") Integer userId,
            @Param("productId") Integer productId,
            @Param("postedUserId") Integer postedUserId);

    /** presetId로 productId 조회 */
    Integer findProductIdByPresetId(@Param("presetId") Integer presetId);

    /** ✅ presetId로 userId 조회 (소유자 확인용) */
    Integer findUserIdByPresetId(@Param("presetId") Integer presetId);

    /** postId로 productId 조회 */
    Integer findProductIdByPostId(@Param("postId") Integer postId);
}