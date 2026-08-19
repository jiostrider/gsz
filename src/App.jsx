import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectsGrid from './components/ProjectsGrid';
import PresentationShowcase from './components/PresentationShowcase';
import EducationAndCertificates from './components/EducationAndCertificates';
import UniqueFeatures from './components/UniqueFeatures';
import AIDrawer from './components/AIDrawer';
import RecruiterSidebar from './components/RecruiterSidebar';
import CustomCursor from './components/CustomCursor';
import CardDealAnimation from './components/CardDealAnimation';
import ImagePreloader from './components/ImagePreloader';
import { useImagePreloader } from './hooks/useImagePreloader';
import { Phone, Github, Linkedin } from 'lucide-react';

function App() {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [demoOpen, setDemoOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const { progress, loaded } = useImagePreloader();
  const audioRef = useRef(null);

  const handleEnter = () => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
      audioRef.current.play().catch(() => {});
    }
    setHasEntered(true);
  };

  // Scroll lock when demo is open or during splash
  useEffect(() => {
    const shouldLock = demoOpen || !hasEntered;
    if (shouldLock) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      const preventWheel = (e) => e.preventDefault();
      const preventTouch = (e) => { if (e.touches.length > 1) e.preventDefault(); };
      document.addEventListener('wheel', preventWheel, { passive: false });
      document.addEventListener('touchmove', preventTouch, { passive: false });
      return () => {
        document.removeEventListener('wheel', preventWheel);
        document.removeEventListener('touchmove', preventTouch);
      };
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [demoOpen, hasEntered]);

  return (
    <main className="relative bg-black min-h-screen w-screen flex flex-col overflow-x-hidden selection:bg-white selection:text-black">
      <CustomCursor />
      <BackgroundVideo muted={!isAudioOn || !hasEntered} audioRef={audioRef} />
      <Navbar onOpenAI={() => setAiDrawerOpen(true)} isAudioOn={isAudioOn} onToggleAudio={() => setIsAudioOn(!isAudioOn)} />

      {/* Content wrapper - blurred when demo is open */}
      <div className={`transition-all duration-500 ${demoOpen ? 'blur-sm pointer-events-none select-none' : ''}`}>
        <RecruiterSidebar />
        <Hero onOpenAI={() => setAiDrawerOpen(true)} demoOpen={demoOpen} onDemoOpen={() => setDemoOpen(true)} />
        <Skills />
        <ProjectsGrid />
        <PresentationShowcase />
        <EducationAndCertificates />
        <UniqueFeatures />

        {/* Footer / Contact */}
        <footer id="contact" className="relative z-10 border-t border-white/10 mt-24">
          <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl text-white font-serif">Jimmy Gao</h3>
              <p className="text-white/50 text-base mt-1">IoT Engineering · Full Stack AI</p>
            </div>
            <div className="flex items-center gap-6 text-base text-white/50">
              <a href="tel:19229770095" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
                19229770095
              </a>
              <a href="mailto:wzgsz2008@foxmail.com" className="hover:text-white transition-colors">Email</a>
              <a href="https://github.com/jiostrider" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/%E6%99%9F%E5%93%B2-%E9%AB%98-62503742a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </div>

      <AIDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />
      <CardDealAnimation isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      <ImagePreloader progress={progress} loaded={loaded} />

      {/* Splash overlay */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            onClick={handleEnter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer backdrop-blur-xl bg-black/30"
          >
            <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
              className="flex flex-col items-center gap-8 relative z-10"
            >
              <h1
                style={{ fontFamily: "'Instrument Serif', serif" }}
                className="text-6xl md:text-8xl text-white tracking-[-0.02em]"
              >
                高晟哲
              </h1>
              <p className="text-white/40 text-sm tracking-[0.3em] uppercase">
                Jimmy Gao · Portfolio
              </p>
              <div className="mt-4 px-8 py-3 border border-white/20 rounded-full text-white/60 text-sm tracking-wider hover:bg-white/10 hover:text-white/80 transition-all duration-300">
                点击进入
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;