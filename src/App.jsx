import React, { useState } from 'react';
import BackgroundVideo from './components/BackgroundVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectsGrid from './components/ProjectsGrid';
import EducationAndCertificates from './components/EducationAndCertificates';
import AIDrawer from './components/AIDrawer';
import RecruiterSidebar from './components/RecruiterSidebar';
import CustomCursor from './components/CustomCursor';
import { Phone, Github, Linkedin } from 'lucide-react';

function App() {
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  return (
    <main className="relative bg-black min-h-screen w-screen flex flex-col overflow-x-hidden selection:bg-white selection:text-black">
      <CustomCursor />
      <BackgroundVideo muted={!isAudioOn} />
      <Navbar onOpenAI={() => setAiDrawerOpen(true)} isAudioOn={isAudioOn} onToggleAudio={() => setIsAudioOn(!isAudioOn)} />
      <RecruiterSidebar />
      <Hero onOpenAI={() => setAiDrawerOpen(true)} />
      <Skills />
      <ProjectsGrid />
      <EducationAndCertificates />
      <AIDrawer isOpen={aiDrawerOpen} onClose={() => setAiDrawerOpen(false)} />
      
      {/* Footer / Contact */}
      <footer id="contact" className="relative z-10 border-t border-white/10 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl text-white font-serif">Jimmy Gao</h3>
            <p className="text-white/50 text-sm mt-1">IoT Engineering · Full Stack AI</p>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
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
    </main>
  );
}

export default App;
