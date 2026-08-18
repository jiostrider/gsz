import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CheckCircle2, Copy, Phone, Mail, ExternalLink } from 'lucide-react';
import CardDealAnimation from './CardDealAnimation';

export default function Hero({ onOpenAI }) {
  const [inputMode, setInputMode] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [demoOpen, setDemoOpen] = useState(false);
  const [copied, setCopied] = useState('');
  
  const [currentLine, setCurrentLine] = useState(0);
  
  const rotatingLines = [
    '系统化逻辑思维',
    '永远谦卑',
    '永远进步',
  ];

  const fullPlaceholder = "输入提问或留存 Email...";

  // Rotating text: each line stays for 2s, then transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % rotatingLines.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inputMode && !submitted) {
      let i = 0;
      const interval = setInterval(() => {
        setPlaceholder(fullPlaceholder.slice(0, i));
        i++;
        if (i > fullPlaceholder.length) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    } else {
      setPlaceholder('');
    }
  }, [inputMode, submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValue.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setInputMode(false);
        setSubmitted(false);
        setEmailValue('');
      }, 10000);
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(''), 1500);
    });
  };

  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto gap-6 pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-7xl md:text-[96px] font-normal tracking-[-0.02em] bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent"
      >
        高晟哲
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/70 text-[11px] font-medium tracking-[0.25em] uppercase"
      >
        TAIYUAN UNIVERSITY OF TECHNOLOGY · IOT ENGINEERING
      </motion.p>

      <div className="h-[88px] md:h-[90px] flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentLine}
              initial={{ opacity: 0, y: 30, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              style={{ fontFamily: "'Instrument Serif', serif" }}
              className="text-5xl md:text-[72px] font-normal leading-[1.08] tracking-[-0.02em] bg-gradient-to-b from-white via-white/95 to-white/60 bg-clip-text text-transparent max-w-4xl"
            >
              {rotatingLines[currentLine]}
            </motion.h1>
          </AnimatePresence>
        </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-white/70 max-w-2xl text-sm md:text-base leading-relaxed"
      >
        太原理工大学物联网工程本科大一新生。对人工智能应用具有高度热情，擅长运用多模型大语言模型协同工作流。
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4 flex flex-col items-center gap-6"
      >
        <AnimatePresence mode="wait">
          {!inputMode ? (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-4"
            >
              <button 
                onClick={onOpenAI}
                className="glass-pill px-6 py-3 text-white font-medium hover:bg-white/10 transition-colors"
              >
                与 AI 数字分身对话
              </button>
              <button 
                onClick={() => setInputMode(true)}
                className="glass-pill px-6 py-3 text-white/80 font-medium hover:bg-white/10 hover:text-white transition-colors"
              >
                获取联系资料
              </button>
            </motion.div>
          ) : !submitted ? (
            <motion.form
              key="input"
              initial={{ opacity: 0, scale: 0.9, width: 200 }}
              animate={{ opacity: 1, scale: 1, width: 320 }}
              exit={{ opacity: 0, scale: 0.9, width: 200 }}
              onSubmit={handleSubmit}
              className="relative"
            >
              <input
                type="text"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                placeholder={placeholder}
                className="liquid-glass w-full rounded-full px-6 py-3 text-white placeholder:text-white/50 focus:outline-none focus:ring-1 focus:ring-white/30"
              />
              {submitted && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </motion.div>
              )}
            </motion.form>
          ) : (
            <motion.div
              key="contact-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="liquid-glass rounded-2xl px-8 py-6 max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">联系方式</h3>
                <button
                  onClick={() => { setInputMode(false); setSubmitted(false); setEmailValue(''); }}
                  className="text-white/40 hover:text-white text-xs transition-colors"
                >
                  关闭
                </button>
              </div>
              <div className="space-y-3 text-left">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> 电话
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-xs">19229770095</span>
                    <button onClick={() => handleCopy('19229770095', 'phone')} className="text-white/30 hover:text-white transition-colors">
                      {copied === 'phone' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-xs">wzgsz2008@foxmail.com</span>
                    <button onClick={() => handleCopy('wzgsz2008@foxmail.com', 'email')} className="text-white/30 hover:text-white transition-colors">
                      {copied === 'email' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">GitHub</span>
                  <a href="https://github.com/jiostrider" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                    <span className="font-mono text-xs">jiostrider</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/50">LinkedIn</span>
                  <a href="https://www.linkedin.com/in/%E6%99%9F%E5%93%B2-%E9%AB%98-62503742a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                    <span className="font-mono text-xs">晟哲-高</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setDemoOpen(true)}
          className="flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors text-sm font-medium"
        >
          <PlayCircle className="w-4 h-4" />
          播放全景项目演示
        </button>
      </motion.div>

      <CardDealAnimation isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}