import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'CET-4 英语四级在线模拟',
    link: 'https://cet-4-online.netlify.app/',
    image: '/images/cet4.png',
    desc: '英语四级在线模拟考试平台，支持听力、阅读、写作全题型练习。',
  },
  {
    id: '02',
    title: '《飞机大战》',
    link: 'https://feijidazhan0.netlify.app/',
    image: '/images/feijidazhan.png',
    desc: '经典飞行射击游戏，使用 Canvas 实现流畅的弹幕射击体验。',
  },
  {
    id: '03',
    title: '《小恐龙跑酷》',
    link: 'https://xiaokonglong01.netlify.app/',
    image: '/images/xiaokonglong.png',
    desc: '像素风格跑酷游戏，致敬 Chrome Dino，支持移动端触控。',
  },
  {
    id: '04',
    title: '《坦克大战·GSZ战场》',
    link: 'https://jiostrider.github.io/tank/',
    image: '/images/tank.png',
    desc: '双人对战坦克游戏，支持键盘操控，可自定义地图布局。',
  },
];

export default function DemoModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
        >
          <motion.div
            initial={{ scale: 0.95, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl text-white font-serif mb-2">全景项目演示</h2>
            <p className="text-white/50 text-sm mb-8">Panoramic Project Demo — 点击卡片访问在线演示</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-[#111] border border-white/5 rounded-xl overflow-hidden hover:border-white/15 transition-colors"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">{p.title}</h3>
                      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                    </div>
                    <p className="text-white/40 text-xs mt-1.5 leading-relaxed">{p.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}