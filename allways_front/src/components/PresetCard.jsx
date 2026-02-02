/** @jsxImportSource @emotion/react */
import { Heart } from 'lucide-react';
import { S } from './PresetCardStyles.js';

export function PresetCard({ item, onClick }) {
  if (!item) return null;

  return (
    <div css={S.card} onClick={onClick}>
      <div css={S.imageWrapper}>
        <img css={S.image} src={item.imgUrl} alt={item.presetName} />
      </div>

      <div css={S.content}>
        <h3 css={S.cardTitle}>{item.presetName}</h3>
        <p css={S.authorText}>작성자 : {item.nickname}</p>
      </div>

      <div css={S.footer}>
        <div css={S.likeBox}>
          <div
            css={S.likeMark}
          >
            <Heart
              fill={item.liked ? '#ff4d4f' : 'none'}
              stroke={item.liked ? '#ff4d4f' : 'currentColor'}
            />
          </div>
          <span css={S.countMini}>{item.likeCount ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
