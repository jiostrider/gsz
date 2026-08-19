import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    num: '01',
    title: '封面 - Freshman\'s Dilemma',
    subtitle: 'The Paralysis of Choice',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_01.jpg',
  },
  {
    num: '02',
    title: '原文段落展示',
    subtitle: 'Key Passage Analysis',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_02.jpg',
  },
  {
    num: '03',
    title: '重点词汇讲解',
    subtitle: 'Key Vocabulary',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_03.jpg',
  },
  {
    num: '04',
    title: '长难句结构分析',
    subtitle: 'Complex Sentence Structure',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_04.jpg',
  },
  {
    num: '05',
    title: '段落主旨 & 作用',
    subtitle: 'Main Idea & Function',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_05.jpg',
  },
  {
    num: '06',
    title: '课堂讨论',
    subtitle: 'Class Discussion',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_06.jpg',
  },
];

export default function PresentationShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  const handleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  return (
    <section id="presentation" className="relative z-10 max-w-5xl mx-auto px-6 py-28 w-full" ref={containerRef}>
      {/* Title */}
      <div className="mb-14">
        <h2 className="text-4xl text-white font-serif tracking-tight">精选 PPT 演讲作品</h2>
        <p className="text-white/50 mt-3 text-base">PPT Presentation Showcase</p>
      </div>

      {/* Carousel */}
      <div className="liquid-glass rounded-2xl overflow-hidden relative">
        <Swiper
          modules={[Navigation, Pagination, Keyboard]}
          navigation={{
            prevEl: '.swiper-custom-prev',
            nextEl: '.swiper-custom-next',
          }}
          pagination={{
            type: 'fraction',
            el: '.swiper-custom-fraction',
          }}
          keyboard={{ enabled: true }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          className="presentation-swiper"
          watchSlidesProgress
          threshold={5}
          touchRatio={1.5}
          grabCursor
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={slide.num}>
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <img
                  src={new URL(`../assets/images/${slide.image}`, import.meta.url).href}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />

                {/* Bottom gradient overlay + info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs font-mono">{slide.num}</span>
                    <span className="w-6 h-px bg-white/20" />
                    <span className="text-white/80 text-sm">{slide.title}</span>
                  </div>
                  <p className="text-white/40 text-xs mt-1">{slide.subtitle}</p>
                </div>

                {/* Fullscreen button */}
                <button
                  onClick={handleFullscreen}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="全屏查看"
                >
                  <Expand className="w-4 h-4" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <button
          className="swiper-custom-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="◀"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="swiper-custom-next absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="▶"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="text-white/40 text-sm font-mono swiper-custom-fraction" />
        <div className="flex items-center gap-3">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={currentIndex === 0}
            className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ◀
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            disabled={currentIndex === slides.length - 1}
            className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}