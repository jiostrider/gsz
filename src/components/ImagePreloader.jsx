import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImagePreloader({ progress, loaded }) {
  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="liquid-glass rounded-full w-20 h-20 flex items-center justify-center relative">
              <svg className="w-10 h-10" viewBox="0 0 36 36">
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <motion.circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 15}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 15 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 15 * (1 - progress / 100) }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <span className="absolute text-sm text-white font-mono">
                {progress}
              </span>
            </div>

            <div className="flex flex-col items-center gap-3 w-48">
              <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/80 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <p className="text-white/40 text-xs tracking-widest uppercase">
                Loading Assets
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
