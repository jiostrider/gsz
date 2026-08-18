import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

export default function EducationAndCertificates() {
  return (
    <section id="education" className="relative z-10 max-w-5xl mx-auto px-6 py-24 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 求学之路 */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="w-6 h-6 text-white/70" />
            <h2 className="text-2xl text-white font-serif">求学之路</h2>
          </div>
          <div className="liquid-glass rounded-xl p-6">
            <div className="flex items-start gap-4">
              <img
                src="/images/images.png"
                alt="太原理工大学"
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div>
                <h3 className="text-lg text-white font-medium">太原理工大学 <span className="text-xs text-blue-400 font-mono ml-1">211 双一流</span></h3>
                <p className="text-white/70 mt-1 text-sm">物联网工程 / 本科在读</p>
                <p className="text-white/40 text-sm mt-2 font-mono">2026.9 - 2030.9（预计）</p>
              </div>
            </div>
          </div>
        </div>

        {/* 荣誉认证 */}
        <div id="certificates">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-white/70" />
            <h2 className="text-2xl text-white font-serif">荣誉认证</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="liquid-glass rounded-xl p-6"
          >
            <h3 className="text-lg text-white font-medium mb-4">达摩院 AI 培训师认证</h3>
            <p className="text-white/70 text-sm mb-1">DAMO Academy</p>
            <p className="text-white/40 text-xs font-mono mb-4">ID: AIT260809225938000178</p>
            <div className="rounded-lg overflow-hidden border border-white/10">
              <img src="/images/certificate.jpg" alt="达摩院 AI 培训师证书" className="w-full h-auto" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}