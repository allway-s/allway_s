/** @jsxImportSource @emotion/react */
import React from 'react';
import { S } from './FeatureSection.styles';

export function FeatureSection({ features = [] }) {
  return (
    <section css={S.section}>
      <div css={S.grid}>
        {features.map((f) => (
          <div key={f.id} css={S.item}>
            <div css={S.iconBox}>
              <span css={S.number}>{f.id}</span>
            </div>
            <h3 css={S.title}>{f.title}</h3>
            <p css={S.desc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}