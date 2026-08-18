import React from 'react';
import { motion } from 'framer-motion';
import { Globe, AudioLines, VolumeX, Bot, FileDown } from 'lucide-react';

export default function Navbar({ onOpenAI, isAudioOn, onToggleAudio }) {

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-30"
    >
      <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto my-4">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-lg tracking-tight">高晟哲</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-white/70 text-sm font-medium">
            <a href="#skills" className="hover:text-white transition-colors">技术栈</a>
            <a href="#projects" className="hover:text-white transition-colors">AI实战作品</a>
            <a href="#education" className="hover:text-white transition-colors">求学之路</a>
            <a href="#certificates" className="hover:text-white transition-colors">荣誉认证</a>
            <a href="#contact" className="hover:text-white transition-colors">联系方式</a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
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
            className="glass-pill px-4 py-2 flex items-center gap-2 text-white text-sm font-medium hover:bg-white/10 transition-colors"
          >
            <Bot className="w-4 h-4" />
            数字分身
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
