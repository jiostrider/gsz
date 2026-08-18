import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    id: '01',
    title: 'CET-4 英语四级在线模拟',
    link: 'https://cet-4-online.netlify.app/',
    image: '/images/cet4.png'
  },
  {
    id: '02',
    title: '《飞机大战》',
    link: 'https://feijidazhan0.netlify.app/',
    image: '/images/feijidazhan.png'
  },
  {
    id: '03',
    title: '《小恐龙跑酷》',
    link: 'https://xiaokonglong01.netlify.app/',
    image: '/images/xiaokonglong.png'
  },
  {
    id: '04',
    title: '《坦克大战·GSZ战场》',
    link: 'https://jiostrider.github.io/tank/',
    image: '/images/tank.png'
  }
];

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    window.open(project.link, '_blank', 'noopener noreferrer');
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="border border-white/5 rounded-2xl cursor-pointer h-56 relative overflow-hidden group"
    >
      {/* Dark background (no image initially) */}
      <div className="absolute inset-0 bg-[#080c14]" />

      {/* White gradient overlay - quickly covers on hover */}
      <div
        className="absolute inset-0 z-10 transition-all duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 45%, rgba(255,255,255,0.35) 100%)',
        }}
      />

      {/* Hover image pop - from mouse position, rotates and expands to fill card */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14, mass: 0.8 }}
            className="absolute inset-0 z-[15] pointer-events-none"
            style={{
              transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
            }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content text - on top of everything */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none">
        <div className="flex justify-between items-start">
          <span className={`font-mono text-sm px-2 py-1 rounded transition-all duration-300 ${isHovered ? 'text-gray-900 bg-white/60' : 'text-white/40 bg-white/5'}`}>
            {project.id}
          </span>
          <ExternalLink className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-gray-900' : 'text-white/40'}`} />
        </div>
        <div>
          <h3 className={`text-xl font-medium transition-colors duration-300 ${isHovered ? 'text-gray-900' : 'text-white drop-shadow-lg'}`}>
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsGrid() {
  return (
    <section id="projects" className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
      <div className="mb-12">
        <h2 className="text-3xl text-white font-serif tracking-tight">AI实战作品</h2>
        <p className="text-white/50 mt-2 text-sm">Interactive Web Experiences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}