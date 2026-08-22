import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'CET-4 英语四级在线模拟',
    link: 'https://cet-4-online.netlify.app/',
    image: 'images/cet4.png',
    desc: '英语四级在线模拟考试平台',
  },
  {
    id: '02',
    title: '《飞机大战》',
    link: 'https://feijidazhan0.netlify.app/',
    image: 'images/feijidazhan.png',
    desc: '经典飞行射击游戏',
  },
  {
    id: '03',
    title: '《小恐龙跑酷》',
    link: 'https://xiaokonglong01.netlify.app/',
    image: 'images/xiaokonglong.png',
    desc: '像素风格跑酷游戏',
  },
  {
    id: '04',
    title: '《坦克大战·GSZ战场》',
    link: 'https://jiostrider.github.io/tank/',
    image: 'images/tank.png',
    desc: '双人对战坦克游戏',
  },
];

function getResponsiveCardSize() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  if (w < 480) return { cardW: 120, cardH: 168, spacing: 90 };
  if (w < 768) return { cardW: 150, cardH: 210, spacing: 120 };
  return { cardW: 200, cardH: 280, spacing: 300 };
}

export default function CardDealAnimation({ isOpen, onClose }) {
  const [phase, setPhase] = useState('idle');
  const [cardSize, setCardSize] = useState(getResponsiveCardSize());

  useEffect(() => {
    const handleResize = () => setCardSize(getResponsiveCardSize());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setPhase('idle');
      const t = setTimeout(() => setPhase('dealing'), 100);
      const t2 = setTimeout(() => setPhase('done'), 1700);
      return () => { clearTimeout(t); clearTimeout(t2); };
    } else {
      setPhase('idle');
    }
  }, [isOpen]);

  const { cardW, cardH, spacing } = cardSize;
  const totalSpan = spacing * 3;

  const cardConfigs = [
    { x: -spacing * 1.5, y: 0, rotateZ: -30, rotateY: -15, zIndex: 1 },
    { x: -spacing * 0.5, y: 0, rotateZ: -10, rotateY: -5,  zIndex: 2 },
    { x: +spacing * 0.5, y: 0, rotateZ: +10, rotateY: +5,  zIndex: 3 },
    { x: +spacing * 1.5, y: 0, rotateZ: +30, rotateY: +15, zIndex: 4 },
  ];

  const arcHeight = -(cardH * 0.45);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-lg"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          onClick={handleOverlayClick}
        >
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: phase !== 'idle' ? 1 : 0, y: phase !== 'idle' ? 0 : -20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
          >
            <h2 className="text-xl md:text-2xl text-white font-serif whitespace-nowrap">全景项目演示</h2>
            <p className="text-white/40 text-[10px] md:text-xs mt-1">Panoramic Project Demo</p>
          </motion.div>

          {/* Cards layer */}
          <div
            className="relative flex items-center justify-center"
            style={{
              width: Math.min(totalSpan + cardW + 40, typeof window !== 'undefined' ? window.innerWidth - 32 : 940),
              height: cardH + 120,
              maxWidth: 'calc(100vw - 32px)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {projects.map((project, index) => {
              const cfg = cardConfigs[index];
              const delay = index * 0.15;

              return (
                <motion.a
                  key={project.id}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute rounded-xl overflow-hidden"
                  style={{
                    width: cardW,
                    height: cardH,
                    left: '50%',
                    top: '50%',
                    marginLeft: -cardW / 2,
                    marginTop: -cardH / 2,
                    zIndex: cfg.zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    rotateZ: index % 2 === 0 ? -1.5 : 1.5,
                    rotateY: 0,
                    scale: 0.9,
                    opacity: 0,
                  }}
                  animate={
                    phase === 'dealing'
                      ? {
                          x: [0, cfg.x * 0.4, cfg.x],
                          y: [0, arcHeight, cfg.y],
                          rotateZ: [index % 2 === 0 ? -1.5 : 1.5, cfg.rotateZ * 0.3, cfg.rotateZ],
                          rotateY: [0, cfg.rotateY * 0.5, cfg.rotateY],
                          scale: [0.9, 1.05, 1],
                          opacity: 1,
                        }
                      : phase === 'done'
                      ? {
                          x: cfg.x, y: cfg.y, rotateZ: cfg.rotateZ, rotateY: cfg.rotateY, scale: 1, opacity: 1,
                        }
                      : {
                          x: 0, y: 0, rotateZ: index % 2 === 0 ? -1.5 : 1.5, rotateY: 0, scale: 0.9, opacity: 0,
                        }
                  }
                  transition={{
                    duration: 1.2,
                    delay: delay,
                    ease: [0.0, 0.0, 0.2, 1.0],
                    opacity: { duration: 0.2, delay: delay },
                    scale: { duration: 0.3, delay: delay, ease: 'easeOut' },
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotateZ: cfg.rotateZ * 0.7,
                    z: 50,
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.3)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                >
                  <div
                    className="w-full h-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col"
                    style={{
                      boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="h-[60%] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center px-3 gap-1">
                      <span className="text-white/30 text-[10px] font-mono tracking-wider">
                        {project.id}
                      </span>
                      <h3 className="text-white text-xs font-medium text-center leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-white/40 text-[10px] text-center">{project.desc}</p>
                      <ExternalLink className="w-3 h-3 text-white/20 mt-0.5" />
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Hint text at bottom */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'done' ? 1 : 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute bottom-8 text-white/30 text-xs pointer-events-none"
          >
            点击卡片访问在线演示 · 点击空白处关闭
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}