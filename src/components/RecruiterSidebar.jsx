import React from 'react';
import { motion } from 'framer-motion';

export default function RecruiterSidebar() {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div 
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 100 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
    >
      <button 
        onClick={handleClick}
        className="flex items-center bg-white text-black py-2 px-3 rounded-r-lg shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:pr-4 hover:scale-[1.05] transition-all duration-300 group cursor-none"
      >
        <span className="text-xs font-semibold tracking-wide whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>
          招聘官看板
        </span>
      </button>
    </motion.div>
  );
}