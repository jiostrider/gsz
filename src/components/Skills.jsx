import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const dimensions = [
  { key: 'ppt', label: 'PPT', value: 80 },
  { key: 'prompt', label: 'Prompt Engineering', value: 80 },
  { key: 'web', label: '网页制作', value: 90 },
  { key: 'workflow', label: 'AI工作流编排', value: 85 },
  { key: 'multi', label: '多模型协同', value: 80 },
];

const cx = 280;
const cy = 240;
const r = 140;
const labelR = 155;

function getPoint(index, radius) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / dimensions.length;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

function getPolygonPoints(values) {
  return dimensions
    .map((_, i) => {
      const p = getPoint(i, (r * values[i]) / 100);
      return `${p.x},${p.y}`;
    })
    .join(' ');
}

const gridLevels = [0.25, 0.5, 0.75, 1];
const centerPoints = dimensions.map(() => `${cx},${cy}`).join(' ');
const finalPoints = getPolygonPoints(dimensions.map((d) => d.value));

export default function Skills() {
  const polyRef = useRef(null);

  // 打印/导出 PDF 前，将雷达数据多边形强制设为最终展开状态，
  // 避免 whileInView 动画未触发时打印出“缩在中心”的退化图形
  useEffect(() => {
    const onBeforePrint = () => {
      polyRef.current?.setAttribute('points', finalPoints);
    };
    window.addEventListener('beforeprint', onBeforePrint);
    return () => window.removeEventListener('beforeprint', onBeforePrint);
  }, []);

  return (
    <section id="skills" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-28 w-full">
      <div className="mb-14">
        <h2 className="text-4xl text-white font-serif tracking-tight">AI 能力雷达图</h2>
        <p className="text-white/50 mt-3 text-base">AI Capability Radar</p>
      </div>

      <div className="flex justify-center overflow-visible">
        <svg
          viewBox="0 0 560 480"
          className="radar-svg w-full max-w-xl"
          style={{ overflow: 'visible' }}
        >
          {/* Background grid pentagons */}
          {gridLevels.map((level) => (
            <polygon
              key={level}
              points={getPolygonPoints(dimensions.map(() => level * 100))}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines from center to each vertex */}
          {dimensions.map((_, i) => {
            const outer = getPoint(i, r);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={outer.x}
                y2={outer.y}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            );
          })}

          {/* Data polygon - animated from center */}
          <motion.polygon
            ref={polyRef}
            initial={{ points: centerPoints }}
            whileInView={{ points: finalPoints }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.2, ease: 'easeOut', type: 'spring', stiffness: 60, damping: 12 }}
            fill="rgba(99, 102, 241, 0.2)"
            stroke="rgba(99, 102, 241, 0.8)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Labels */}
          {dimensions.map((d, i) => {
            const p = getPoint(i, labelR);
            let textAnchor = 'middle';
            let dx = 0;
            if (p.x < cx - 60) { textAnchor = 'end'; dx = -6; }
            else if (p.x > cx + 60) { textAnchor = 'start'; dx = -6; }

            let dy = 0;
            if (i === 0) dy = -4;
            else if (i === 2 || i === 3) dy = 16;
            else dy = 0;

            return (
              <motion.text
                key={i}
                x={p.x + dx}
                y={p.y + dy}
                textAnchor={textAnchor}
                fill="rgba(255,255,255,0.75)"
                fontSize="14"
                fontWeight="500"
                fontFamily="Inter, system-ui, sans-serif"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
              >
                {d.label}
              </motion.text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}