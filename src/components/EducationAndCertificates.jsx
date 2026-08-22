import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const certificates = [
  {
    name: '达摩院 AI 培训师认证',
    issuer: 'DAMO Academy',
    id: 'AIT260809225938000178',
    image: 'certificate.webp',
  },
  {
    name: '人工智能训练师（高级）',
    holder: '高晟哲',
    date: '2026.08.19',
    image: 'ai-trainer-cert.webp',
  },
  {
    name: '阿里云 Apsara Clouder · VISION 人工智能设计（入门）',
    issuer: 'Alibaba Cloud',
    holder: '高晟哲',
    id: 'CLDM06260802763267',
    date: '2028.08.19',
    image: 'alibaba-cloud-vision-cert.webp',
  },
  {
    name: '阿里云 Apsara Clouder · 基于百炼平台构建智能体应用',
    issuer: 'Alibaba Cloud',
    holder: '高晟哲',
    id: 'CLDM02260802762629',
    date: '2028.08.18',
    image: 'alibaba-cloud-agent-builder-cert.webp',
  },
  {
    name: '阿里云 Apsara Clouder · Spring AI 应用开发（入门）',
    issuer: 'Alibaba Cloud',
    holder: '高晟哲',
    id: 'CLDM09260802763268',
    date: '2028.08.19',
    image: 'alibaba-cloud-spring-ai-cert.webp',
  },
  {
    name: '阿里云 Apsara Clouder · 基于 PAI ArtLab 的 AIGC 设计基础',
    issuer: 'Alibaba Cloud',
    holder: '高晟哲',
    id: 'CLDM05260802763264',
    date: '2028.08.19',
    image: 'alibaba-cloud-aigc-cert.webp',
  },
];

export default function EducationAndCertificates() {
  return (
    <section id="education" className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 py-28 md:py-32 w-full">
      <div className="flex flex-col gap-[108px] md:gap-[130px] lg:gap-[151px]">
        {/* 求学之路 */}
        <div>
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <GraduationCap className="w-6 h-6 text-white/70" />
            <h2 className="text-3xl text-white font-serif">求学之路</h2>
          </div>
          <div className="liquid-glass rounded-xl p-8">
            <div className="flex flex-col items-center text-center gap-4">
              <img
                src={new URL('../assets/images/images.png', import.meta.url).href}
                alt="太原理工大学"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-xl text-white font-medium">太原理工大学 <span className="text-sm text-blue-400 font-mono ml-1">211 双一流</span></h3>
                <p className="text-white/70 mt-2 text-base">物联网工程 / 本科在读</p>
                <p className="text-white/40 text-base mt-2 font-mono">2026.9 - 2030.6（预计）</p>
              </div>
            </div>
          </div>
        </div>

        {/* 荣誉认证 */}
        <div id="certificates">
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <Award className="w-6 h-6 text-white/70" />
            <h2 className="text-3xl text-white font-serif">荣誉认证</h2>
          </div>
          <div className="flex flex-col gap-6 print-cert-grid">
            {certificates.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="liquid-glass rounded-xl p-6"
              >
                <div className="grid grid-cols-[2fr_3fr] sm:grid-cols-2 gap-5 md:gap-10 items-center">
                  <div className="text-center sm:text-left min-w-0">
                    <h3 className="text-lg md:text-xl text-white font-medium mb-3">{cert.name}</h3>
                    {cert.issuer && <p className="text-white/70 text-sm md:text-base mb-1">{cert.issuer}</p>}
                    {cert.holder && <p className="text-white/70 text-sm md:text-base mb-1">持证：{cert.holder}</p>}
                    {cert.id && <p className="text-white/40 text-xs md:text-sm font-mono break-all">ID: {cert.id}</p>}
                    {cert.date && <p className="text-white/40 text-xs md:text-sm font-mono">日期：{cert.date}</p>}
                  </div>
                  <div className="rounded-lg overflow-hidden border border-white/10 shadow-xl shadow-black/20">
                    <img src={new URL(`../assets/images/${cert.image}`, import.meta.url).href} alt={cert.name} className="w-full h-auto" loading="lazy" decoding="async" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}