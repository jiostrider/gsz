import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows instantly (no delay)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const handleMouseLeave = () => {
      targetRef.current = { x: -100, y: -100 };
      ringPosRef.current = { x: -100, y: -100 };
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let rafId;
    const animate = () => {
      // Ring follows with delay (lerp)
      const dx = targetRef.current.x - ringPosRef.current.x;
      const dy = targetRef.current.y - ringPosRef.current.y;
      ringPosRef.current.x += dx * 0.08;
      ringPosRef.current.y += dy * 0.08;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 16}px, ${ringPosRef.current.y - 16}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Center dot - accurate position, no delay */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]"
        style={{
          background: '#fff',
          mixBlendMode: 'difference',
        }}
      />
      {/* Outer ring - trailing with delay */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1.5px solid rgba(255,255,255,0.5)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}