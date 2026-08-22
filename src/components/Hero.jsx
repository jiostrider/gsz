import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, CheckCircle2, Copy, Phone, Mail, ExternalLink, FileDown } from 'lucide-react';
import CardDealAnimation from './CardDealAnimation';

export default function Hero({ onOpenAI, demoOpen, onDemoOpen }) {
  const [inputMode, setInputMode] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [copied, setCopied] = useState('');
  
  const [currentLine, setCurrentLine] = useState(0);
  const [resumeAvailable, setResumeAvailable] = useState(true);

  const rotatingLines = [
    '系统化逻辑思维',
    '永远谦卑',
    '永远进步',
  ];

  const fullPlaceholder = "输入提问或留存 Email...";

  // 预检简历文件是否可访问且确为 PDF（而非被 SPA 路由重写为 HTML）。
  // 若不可用则禁用下载按钮，给出明确反馈而非浏览器静默报错
  useEffect(() => {
    fetch('resume.pdf', { method: 'HEAD' })
      .then((res) => {
        const type = res.headers.get('content-type') || '';
        setResumeAvailable(res.ok && type.includes('pdf'));
      })
      .catch(() => setResumeAvailable(false));
  }, []);

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
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center max-w-5xl mx-auto gap-8">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-8xl md:text-[192px] font-normal tracking-[-0.02em] bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent"
      >
        高晟哲
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/70 text-sm md:text-[28px] font-medium tracking-[0.25em] uppercase"
      >
        TAIYUAN UNIVERSITY OF TECHNOLOGY · IOT ENGINEERING
      </motion.p>

      <div className="hero-rotating h-[100px] md:h-[104px] flex items-center justify-center overflow-hidden">
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

      {/* 打印专用：三句座右铭同时显示，字体为“高晟哲”的一半（屏幕浏览时隐藏） */}
      <div className="print-rotating-lines" aria-hidden>
        {rotatingLines.map((line) => (
          <p key={line} className="print-rotating-line">{line}</p>
        ))}
      </div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed"
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
                className="liquid-glass rounded-full px-6 py-3 text-white font-medium hover:scale-[1.05] transition-all duration-300"
              >
                与 AI 数字分身对话
              </button>
              <button 
                onClick={() => setInputMode(true)}
                className="liquid-glass rounded-full px-6 py-3 text-white/80 font-medium hover:scale-[1.05] hover:text-white transition-all duration-300"
              >
                获取联系资料
              </button>
              {resumeAvailable ? (
                <a
                  href="resume.pdf"
                  download="高晟哲-简历.pdf"
                  className="liquid-glass rounded-full px-6 py-3 flex items-center gap-2 text-white/80 font-medium hover:scale-[1.05] hover:text-white transition-all duration-300 print:hidden"
                >
                  <FileDown className="w-4 h-4" />
                  下载 PDF 简历
                </a>
              ) : (
                <span
                  title="简历文件暂不可用，请稍后重试"
                  className="liquid-glass rounded-full px-6 py-3 flex items-center gap-2 text-white/40 opacity-60 cursor-not-allowed print:hidden"
                >
                  <FileDown className="w-4 h-4" />
                  简历暂不可用
                </span>
              )}
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
          onClick={onDemoOpen}
          className="liquid-glass rounded-full px-8 py-4 flex items-center gap-2.5 text-white/90 hover:text-white hover:scale-[1.05] transition-all duration-300 text-base font-medium"
        >
          <PlayCircle className="w-5 h-5" />
          播放全景项目演示
        </button>
      </motion.div>
    </section>
  );
}