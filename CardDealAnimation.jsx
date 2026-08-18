import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

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

// Card dimensions and spacing
const CARD_W = 200;
const CARD_H = 280;
const SPACING = CARD_W * 1.5; // 300px between centers (accounts for rotation-induced bounding box expansion)
const TOTAL_SPAN = SPACING * 3; // 900px

// Final positions: 4 cards fan spread
const cardConfigs = [
  { x: -SPACING * 1.5, y: 0, rotateZ: -30, rotateY: -15, zIndex: 1 },
  { x: -SPACING * 0.5, y: 0, rotateZ: -10, rotateY: -5,  zIndex: 2 },
  { x: +SPACING * 0.5, y: 0, rotateZ: +10, rotateY: +5,  zIndex: 3 },
  { x: +SPACING * 1.5, y: 0, rotateZ: +30, rotateY: +15, zIndex: 4 },
];

// Arc height for bezier-like curve (30% of "table height" ~ 400px)
const ARC_HEIGHT = -120;

export default function CardDealAnimation({ isOpen, onClose }) {
  const [phase, setPhase] = useState('idle'); // idle | dealing | done

  useEffect(() => {
    if (isOpen) {
      setPhase('idle');
      // Start dealing after a brief delay for the overlay to appear
      const t = setTimeout(() => setPhase('dealing'), 100);
      // Mark as done after all animations complete
      const t2 = setTimeout(() => setPhase('done'), 1700);
      return () => { clearTimeout(t); clearTimeout(t2); };
    } else {
      setPhase('idle');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          onClick={onClose}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
            aria-label="关闭"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: phase !== 'idle' ? 1 : 0, y: phase !== 'idle' ? 0 : -20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10"
          >
            <h2 className="text-2xl text-white font-serif">全景项目演示</h2>
            <p className="text-white/40 text-xs mt-1">Panoramic Project Demo</p>
          </motion.div>

          {/* Cards layer */}
          <div
            className="relative flex items-center justify-center"
            style={{ width: TOTAL_SPAN + CARD_W + 100, height: CARD_H + 200 }}
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
                    width: CARD_W,
                    height: CARD_H,
                    left: '50%',
                    top: '50%',
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
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
                          x: [
                            0,
                            cfg.x * 0.4,
                            cfg.x,
                          ],
                          y: [
                            0,
                            ARC_HEIGHT,
                            cfg.y,
                          ],
                          rotateZ: [
                            index % 2 === 0 ? -1.5 : 1.5,
                            cfg.rotateZ * 0.3,
                            cfg.rotateZ,
                          ],
                          rotateY: [
                            0,
                            cfg.rotateY * 0.5,
                            cfg.rotateY,
                          ],
                          scale: [
                            0.9,
                            1.05,
                            1,
                          ],
                          opacity: 1,
                        }
                      : phase === 'done'
                      ? {
                          x: cfg.x,
                          y: cfg.y,
                          rotateZ: cfg.rotateZ,
                          rotateY: cfg.rotateY,
                          scale: 1,
                          opacity: 1,
                        }
                      : {
                          x: 0,
                          y: 0,
                          rotateZ: index % 2 === 0 ? -1.5 : 1.5,
                          rotateY: 0,
                          scale: 0.9,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 1.2,
                    delay: delay,
                    ease: [0.0, 0.0, 0.2, 1.0], // ease-out
                    opacity: { duration: 0.2, delay: delay },
                    scale: {
                      duration: 0.3,
                      delay: delay,
                      ease: 'easeOut',
                    },
                  }}
                  whileHover={{
                    scale: 1.08,
                    rotateZ: cfg.rotateZ * 0.7,
                    z: 50,
                    boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(99,102,241,0.3)',
                    transition: { duration: 0.3, ease: 'easeOut' },
                  }}
                >
                  {/* Card body */}
                  <div
                    className="w-full h-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col"
                    style={{
                      boxShadow: '0 8px 30px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)',
                    }}
                  >
                    {/* Image */}
                    <div className="h-[60%] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Card info */}
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
            className="absolute bottom-8 text-white/30 text-xs"
          >
            点击卡片访问在线演示 · 点击空白处关闭
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}