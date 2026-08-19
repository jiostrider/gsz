import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { flushSync } from 'react-dom';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'CET-4 英语四级在线模拟',
    link: 'https://cet-4-online.netlify.app/',
    image: new URL('../assets/images/cet4.png', import.meta.url).href
  },
  {
    id: '02',
    title: '《飞机大战》',
    link: 'https://feijidazhan0.netlify.app/',
    image: new URL('../assets/images/feijidazhan.png', import.meta.url).href
  },
  {
    id: '03',
    title: '《小恐龙跑酷》',
    link: 'https://xiaokonglong01.netlify.app/',
    image: new URL('../assets/images/xiaokonglong.png', import.meta.url).href
  },
  {
    id: '04',
    title: '《坦克大战·GSZ战场》',
    link: 'https://jiostrider.github.io/tank/',
    image: new URL('../assets/images/tank.png', import.meta.url).href
  }
];

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const cardRef = useRef(null);

  // 打印/导出 PDF 时强制显示项目图片（图片在 AnimatePresence 中按需渲染）
  useEffect(() => {
    const onBeforePrint = () => flushSync(() => setIsPrinting(true));
    const onAfterPrint = () => setIsPrinting(false);
    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onAfterPrint);
    };
  }, []);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // IntersectionObserver: 移动端滚动进入视口时显示图片，离开时恢复液态玻璃效果
  useEffect(() => {
    const el = cardRef.current;
    if (!isTouchDevice || !el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isTouchDevice]);

  const handleMouseEnter = (e) => {
    if (isTouchDevice) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (isTouchDevice) return;
    if (!isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setIsHovered(false);
  };

  const handleClick = () => {
    window.open(project.link, '_blank', 'noopener noreferrer');
  };

  const showImage = isPrinting || (isTouchDevice ? isInView : isHovered);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="liquid-glass rounded-2xl cursor-pointer h-64 relative overflow-hidden group"
    >
      {/* White gradient overlay */}
      <div
        className="absolute inset-0 z-10 transition-all duration-300 pointer-events-none"
        style={{
          opacity: showImage ? 1 : 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.35) 100%)',
        }}
      />

      {/* Image pop */}
      <AnimatePresence>
        {showImage && (
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.8 }}
            className="absolute inset-0 z-[15] pointer-events-none"
            style={{
              transformOrigin: isTouchDevice ? '50% 50%' : `${mousePos.x}px ${mousePos.y}px`,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content text */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
        <div className="flex justify-between items-start">
          <span className={`font-mono text-base px-3 py-1.5 rounded transition-all duration-300 ${showImage ? 'text-gray-900 bg-white/60' : 'text-white/40 bg-white/5'}`}>
            {project.id}
          </span>
          <ExternalLink className={`w-6 h-6 transition-colors duration-300 ${showImage ? 'text-gray-900' : 'text-white/40'}`} />
        </div>
        <div>
          <h3 className={`text-2xl font-medium transition-colors duration-300 ${showImage ? 'text-gray-900' : 'text-white drop-shadow-lg'}`}>
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <section id="projects" className="relative z-10 max-w-5xl mx-auto px-6 py-28 w-full">
      <div className="mb-14">
        <h2 className="text-4xl text-white font-serif tracking-tight">AI实战作品</h2>
        <p className="text-white/50 mt-3 text-base">Interactive Web Experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}