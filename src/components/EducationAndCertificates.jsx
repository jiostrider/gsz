import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Heart } from 'lucide-react';

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
            <div className="flex items-start gap-5">
              <img
                src={new URL('../assets/images/images.png', import.meta.url).href}
                alt="太原理工大学"
                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-xl text-white font-medium">太原理工大学 <span className="text-sm text-blue-400 font-mono ml-1">211 双一流</span></h3>
                <p className="text-white/70 mt-2 text-base">物联网工程 / 本科在读</p>
                <p className="text-white/40 text-base mt-2 font-mono">2026.9 - 2030.9（预计）</p>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-xl p-6"
          >
            <h3 className="text-xl text-white font-medium mb-4">达摩院 AI 培训师认证</h3>
            <p className="text-white/70 text-base mb-1">DAMO Academy</p>
            <p className="text-white/40 text-sm font-mono mb-4">ID: AIT260809225938000178</p>
            <div className="flex justify-center">
              <div className="rounded-lg overflow-hidden border border-white/10 w-3/4 md:w-1/2 lg:w-[37.5%]">
                <img src={new URL('../assets/images/certificate.jpg', import.meta.url).href} alt="达摩院 AI 培训师证书" className="w-full h-auto" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* 特别感谢 */}
        <div>
          <div className="flex items-center gap-3 mb-8 md:mb-12">
            <Heart className="w-6 h-6 text-red-400/70" />
            <h2 className="text-3xl text-white font-serif">特别感谢</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-xl p-8"
          >
            <div className="flex flex-col items-center gap-4">
              <Heart className="w-8 h-8 text-red-400/40" />
              <p className="text-white/80 text-base leading-relaxed text-center max-w-2xl">
                特别感谢浪尖儿社区的课程培养，让我从原来啥也不会的AI小白、大学新生快速掌握大学技能，使我能够在学习生活中独立开发出我喜欢的游戏、网站、音乐作品、学习工具、资讯工具及财务指导应用，帮助我离梦想更进一步。
              </p>
              <div className="mt-2 flex items-center gap-3 text-red-400/50 text-sm tracking-widest">
                <span className="w-8 h-px bg-red-400/30"></span>
                感恩 · 致谢
                <span className="w-8 h-px bg-red-400/30"></span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}