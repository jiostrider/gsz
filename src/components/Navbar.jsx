import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe, AudioLines, VolumeX, Bot, FileDown } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'skills', label: '技术栈' },
  { id: 'projects', label: 'AI实战作品' },
  { id: 'education', label: '求学之路' },
  { id: 'certificates', label: '荣誉认证' },
  { id: 'contact', label: '联系方式' },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navHeight = 80;
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Navbar({ onOpenAI, isAudioOn, onToggleAudio }) {
  const [activeId, setActiveId] = useState('');
  const [mouseX, setMouseX] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(Boolean);
    sections.forEach((el) => observer.observe(el));
    return () => sections.forEach((el) => observer.unobserve(el));
  }, []);

  const handleMouseMove = (e) => {
    const rect = barRef.current?.getBoundingClientRect();
    if (rect) {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      setMouseX(Math.max(0, Math.min(100, x)));
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-30"
    >
      <div
        ref={barRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto my-4 relative overflow-hidden"
      >
        {/* Pill raise overlay - follows cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovering ? 1 : 0,
            background: `radial-gradient(100px circle at ${mouseX}% 50%, rgba(255,255,255,0.12) 0%, transparent 70%)`,
          }}
        />

        {/* Left Section */}
        <div className="flex items-center gap-8 relative z-10">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-xl tracking-tight">高晟哲</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-base font-medium">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-all duration-300 ${
                  activeId === item.id
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative z-10">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
            title="导出 PDF"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">导出</span>
          </button>
          <button 
            onClick={onToggleAudio}
            className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors text-sm"
            title={isAudioOn ? '关闭背景音效' : '开启背景音效'}
          >
            {isAudioOn ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <AudioLines className="w-4 h-4 text-green-400" />
              </motion.div>
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-xs">{isAudioOn ? '音效开' : '音效关'}</span>
          </button>
          <button 
            onClick={onOpenAI}
            className="liquid-glass rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-medium hover:scale-[1.05] transition-all duration-300"
          >
            <Bot className="w-4 h-4" />
            数字分身
          </button>
        </div>
      </div>
    </motion.nav>
  );
}