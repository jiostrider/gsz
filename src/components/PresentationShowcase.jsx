import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Expand, Play, Pause } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const slides = [
  {
    num: '01',
    title: '封面 - Freshman\'s Dilemma',
    subtitle: 'The Paralysis of Choice',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_01.webp',
  },
  {
    num: '02',
    title: '原文段落展示',
    subtitle: 'Key Passage Analysis',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_02.webp',
  },
  {
    num: '03',
    title: '重点词汇讲解',
    subtitle: 'Key Vocabulary',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_03.webp',
  },
  {
    num: '04',
    title: '长难句结构分析',
    subtitle: 'Complex Sentence Structure',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_04.webp',
  },
  {
    num: '05',
    title: '段落主旨 & 作用',
    subtitle: 'Main Idea & Function',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_05.webp',
  },
  {
    num: '06',
    title: '课堂讨论',
    subtitle: 'Class Discussion',
    image: 'Freshmans-Dilemma-The-Paralysis-of-Choice (1)_06.webp',
  },
];

// 每张幻灯片停留时长（毫秒）
const AUTOPLAY_DELAY = 3000;
// 自动播放时鼠标静止多久后隐藏指针（毫秒）
const CURSOR_HIDE_DELAY = 2500;

export default function PresentationShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  const togglePlay = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  // 全屏状态同步（支持 ESC 退出）
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // 仅当演示文稿进入可视区域时，才启用键盘快捷键与指针隐藏
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 键盘快捷键：空格/P 播放或暂停，←/→ 前后切换，F 全屏
  useEffect(() => {
    const handler = (e) => {
      if (!inView || !swiperRef.current) return;
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space' || e.code === 'KeyP') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        swiperRef.current.slideNext();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        swiperRef.current.slidePrev();
      } else if (e.code === 'KeyF') {
        handleFullscreen();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [inView]);

  // 自动播放时隐藏鼠标指针：静止一段时间后隐藏自定义光标，移动即恢复
  useEffect(() => {
    if (!inView || !isPlaying) {
      document.body.classList.remove('presentation-cursor-hidden');
      return;
    }
    let timer;
    const showCursor = () => {
      document.body.classList.remove('presentation-cursor-hidden');
      clearTimeout(timer);
      timer = setTimeout(
        () => document.body.classList.add('presentation-cursor-hidden'),
        CURSOR_HIDE_DELAY
      );
    };
    showCursor();
    window.addEventListener('mousemove', showCursor);
    window.addEventListener('mousedown', showCursor);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', showCursor);
      window.removeEventListener('mousedown', showCursor);
      document.body.classList.remove('presentation-cursor-hidden');
    };
  }, [inView, isPlaying]);

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
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: '.swiper-custom-prev',
            nextEl: '.swiper-custom-next',
          }}
          autoplay={{
            delay: AUTOPLAY_DELAY,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          speed={800}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          onSwiper={(swiper) => { swiperRef.current = swiper; }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          onAutoplayStart={() => setIsPlaying(true)}
          onAutoplayStop={() => setIsPlaying(false)}
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
          aria-label="上一张"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="swiper-custom-next absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="下一张"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom controls */}
      <div className="flex items-center justify-between mt-4 px-1">
        <div className="text-white/40 text-sm font-mono tabular-nums tracking-widest">
          {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          <span className="ml-3 text-white/25">{isPlaying ? '自动播放中' : '已暂停'}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            title={isPlaying ? '暂停 (空格)' : '播放 (空格)'}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:bg-white/10 transition-all"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isPlaying ? '暂停' : '播放'}
          </button>
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:bg-white/10 transition-all"
          >
            ◀
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:bg-white/10 transition-all"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}
