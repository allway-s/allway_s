/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { S } from './MainBannerStyles.js';

export function MainBanner({ items }) {
  const extendedSlides = [items[items.length - 1], ...items, items[0]];
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = useCallback(() => {
    if (currentSlide >= extendedSlides.length - 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  }, [currentSlide, extendedSlides.length]);

  const prevSlide = () => {
    if (currentSlide <= 0) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  useEffect(() => {
    if (currentSlide === extendedSlides.length - 1) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(1);
      }, 600);
    }
    if (currentSlide === 0) {
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(extendedSlides.length - 2);
      }, 600);
    }
  }, [currentSlide, extendedSlides.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section css={S.section}>
      <button className="arrow-btn" css={S.arrowButton('left')} onClick={prevSlide}>
        <ChevronLeft size={32} />
      </button>
      <button className="arrow-btn" css={S.arrowButton('right')} onClick={nextSlide}>
        <ChevronRight size={32} />
      </button>

      <div
        css={S.wrapper}
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
        }}
      >
        {extendedSlides.map((item, idx) => (
          <div key={`${item.id}-${idx}`} css={S.item} style={{ backgroundColor: item.color }}>
            <div css={S.content}>
              <div css={S.text}>
                <h2 style={{ whiteSpace: 'pre-line' }}>{item.title}</h2>
                <p>{item.sub}</p>
              </div>
              <div css={S.imageArea}>
                <img src={item.image} alt={item.title} css={S.img} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div css={S.dots}>
        {items.map((_, i) => {
          const isActive = (currentSlide === i + 1 || (currentSlide === 0 && i === items.length - 1) || (currentSlide === extendedSlides.length - 1 && i === 0));
          return (
            <div
              key={i}
              css={S.dot(isActive)}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentSlide(i + 1);
              }}
            />
          );
        })}
      </div>
    </section>
  );
}