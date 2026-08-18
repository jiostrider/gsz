import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Cpu, Gamepad2, Zap } from 'lucide-react';

const chips = [
  { icon: Sparkles, text: "核心优势" },
  { icon: Cpu, text: "物联网基础" },
  { icon: Zap, text: "AI 提效" },
  { icon: Gamepad2, text: "独立作品" },
];

export default function AIDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是高晟哲的 AI 数字分身。你想了解关于他的哪些信息？' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text) => {
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let response = "这是一个模拟回复。在真实应用中，这里会连接到 LLM 后端。高晟哲擅长使用 AI 提效，并具备扎实的物联网工程基础。";
      if (text.includes("核心优势")) response = "我的核心优势在于将底层物联网技术与前沿大语言模型结合，具备系统化逻辑思维，且永远保持谦卑与进步的态度。";
      if (text.includes("物联网")) response = "我本科主修物联网工程，对 C 语言、嵌入式底层驱动有深入理解。";
      if (text.includes("作品")) response = "我独立开发了多款网页应用和小游戏，如《CET-4 模拟》、《坦克大战》等，注重用户交互与性能优化。";
      
      setMessages(prev => [...prev, { role: 'ai', content: response }]);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Jimmy AI 分身</h3>
                  <p className="text-white/50 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-tr-sm' 
                      : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
              <div className="flex flex-wrap gap-2 mb-4">
                {chips.map((chip, i) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(chip.text)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <Icon className="w-3 h-3" />
                      {chip.text}
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="输入你的问题..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
                />
                <button 
                  onClick={() => handleSend(input)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
