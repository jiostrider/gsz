import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, PenTool, Users, Sparkles } from 'lucide-react';

const makerProjects = [
  {
    title: '自动巡航小车',
    label: '图一',
    description: '基于 D2-5 巡线模块的智能循迹小车，搭载红外传感器实现自动巡航，跑道宽度 15mm，可沿预设路径稳定行驶。',
    tech: ['D2-5 巡线模块', '红外传感器', '智能循迹'],
    image: 'line-car.gif',
    isGif: true,
  },
  {
    title: '时钟与温度计结合体',
    label: '图二',
    description: '融合电子时钟与温度显示的多功能装置，采用七段数码管显示，实时呈现时间与环境温度，兼具实用性与观赏性。',
    tech: ['七段数码管', '实时温度传感', '时钟模块'],
    image: 'clock-thermo.gif',
    isGif: true,
  },
];

const artWorks = [
  {
    title: '素描 8 级证书',
    label: '图三',
    description: '中国美术学院社会美术水平考级证书，素描专业捌级，由专业机构评定，见证多年艺术学习成果。',
    issuer: 'China Academy of Art',
    date: '2020-09-17',
    image: 'sketch-cert.jpg',
    isCertificate: true,
  },
  {
    title: '素描头像作品',
    description: '采用石墨铅笔绘制的人像素描，注重光影层次与结构表现，体现扎实的造型能力。',
    image: 'sketch-portrait.jpg',
    isCertificate: false,
  },
  {
    title: '素描静物作品',
    description: '静物组合素描练习，运用明暗对比与空间透视，展现物品质感与构图能力。',
    image: 'sketch-landscape.jpg',
    isCertificate: false,
  },
];

const volunteerWorks = [
  {
    title: '温州市鹿城区白鹿亭慈善联合会志愿活动',
    label: '图四',
    description: '参与社区志愿者服务，协助组织慈善活动、分发爱心物资，为社区公益事业贡献力量。',
    details: '累计服务时长 40+ 小时',
    date: '2021-11-28',
    image: 'volunteer-2021.jpg',
  },
  {
    title: '白鹿亭慈善联合会志愿义工活动',
    label: '图五',
    description: '持续参与社区志愿服务，协助开展公益活动策划与执行，传递温暖与爱心。',
    details: '累计服务时长 60+ 小时',
    date: '2022-10-03',
    image: 'volunteer-2022.jpg',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-8 md:mb-12">
      <Icon className="w-6 h-6 text-white/70" />
      <h2 className="text-3xl text-white font-serif">{title}</h2>
      {subtitle && <span className="text-white/30 text-sm ml-2">{subtitle}</span>}
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="liquid-glass rounded-xl overflow-hidden"
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden bg-white/5">
          <img
            src={new URL(`../assets/images/${project.image}`, import.meta.url).href}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        {project.label && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-mono">
            {project.label}
          </span>
        )}
        {project.isGif && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-green-500/80 text-white text-xs font-mono">
            GIF
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg text-white font-medium mb-2">{project.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-3">{project.description}</p>
        {project.tech && (
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">
                {t}
              </span>
            ))}
          </div>
        )}
        {project.issuer && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-white/50 text-xs">{project.issuer}</p>
            <p className="text-white/30 text-xs font-mono mt-1">颁发日期：{project.date}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CertificateCard({ item, index }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="liquid-glass rounded-xl overflow-hidden"
    >
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden bg-white/5">
          <img
            src={new URL(`../assets/images/${item.image}`, import.meta.url).href}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        {item.label && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-mono">
            {item.label}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg text-white font-medium mb-2">{item.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-2">{item.description}</p>
        {item.issuer && (
          <p className="text-white/40 text-xs">{item.issuer}</p>
        )}
        {item.date && (
          <p className="text-white/30 text-xs font-mono mt-1">颁发日期：{item.date}</p>
        )}
      </div>
    </motion.div>
  );
}

function VolunteerCard({ item, index }) {
  return (
    <motion.div
      {...fadeInUp}
      transition={{ delay: index * 0.1 }}
      className="liquid-glass rounded-xl overflow-hidden"
    >
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden bg-white/5">
          <img
            src={new URL(`../assets/images/${item.image}`, import.meta.url).href}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </div>
        {item.label && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-white/70 text-xs font-mono">
            {item.label}
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg text-white font-medium mb-2">{item.title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs">
            {item.details}
          </span>
          <span className="text-white/30 text-xs font-mono">{item.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function UniqueFeatures() {
  return (
    <section id="unique" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-28 w-full">
      {/* 页面标题 */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <Sparkles className="w-5 h-5 text-purple-400/70" />
          <span className="text-purple-400/70 text-sm tracking-widest uppercase">Unique Features</span>
        </div>
        <h2 className="text-4xl text-white font-serif tracking-tight">独特之处</h2>
        <p className="text-white/50 mt-3 text-base">跨界能力 · 全面发展</p>
      </div>

      <div className="flex flex-col gap-[108px] md:gap-[130px] lg:gap-[151px]">
        {/* 电子创客项目 */}
        <div>
          <SectionHeader icon={Cpu} title="电子创客" subtitle="Electronic Maker" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {makerProjects.map((p, i) => (
              <ProjectCard key={i} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* 艺术能力 */}
        <div>
          <SectionHeader icon={PenTool} title="艺术能力" subtitle="Artistic Ability" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artWorks.map((item, i) => (
              <CertificateCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* 社会责任实践 */}
        <div>
          <SectionHeader icon={Users} title="社会责任" subtitle="Social Responsibility" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {volunteerWorks.map((item, i) => (
              <VolunteerCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}