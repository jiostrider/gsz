// 生成 ATS 友好型传统 PDF 简历（public/resume.pdf）
// 运行：node scripts/generate-resume.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../public/resume.pdf');

// 中文字体：优先黑体，其次楷体（仅本机生成使用）
const CANDIDATE_FONTS = [
  'C:/Windows/Fonts/simhei.ttf',
  'C:/Windows/Fonts/simkai.ttf',
  'C:/Windows/Fonts/Deng.ttf',
];
const FONT = CANDIDATE_FONTS.find((f) => fs.existsSync(f));
if (!FONT) {
  console.error('未找到可用中文字体，请确认系统存在 simhei.ttf / simkai.ttf / Deng.ttf');
  process.exit(1);
}

const doc = new PDFDocument({ size: 'A4', margin: 48, bufferPages: true });

// 常量
const W = doc.page.width;
const LEFT = 48;
const RIGHT = W - 48;
const CONTENT_WIDTH = RIGHT - LEFT;

const GRAY = '#444444';
const LIGHT = '#888888';
const LINE = '#999999';

const FONT_TITLE = 24;
const FONT_NAME = 15;
const FONT_SECTION = 12;
const FONT_BODY = 10.5;
const FONT_META = 9.5;

// ---- 绘制工具 ----
const sectionGap = () => doc.moveDown(0.8);

function sectionTitle(text) {
  doc.moveDown(1.2);
  doc.font(FONT, FONT_SECTION).fillColor('#111111').text(text, LEFT, doc.y, {
    width: CONTENT_WIDTH,
    characterSpacing: 1,
  });
  // 标题下细线
  const y = doc.y + 3;
  doc.moveTo(LEFT, y).lineTo(RIGHT, y).lineWidth(0.8).strokeColor(LINE).stroke();
  doc.moveDown(0.5);
}

function bodyLine(text, opts = {}) {
  const size = opts.size || FONT_BODY;
  const color = opts.color || GRAY;
  doc.font(FONT, size)
    .fillColor(color)
    .text(text, LEFT + (opts.indent || 0), doc.y, {
      width: CONTENT_WIDTH - (opts.indent || 0),
      lineGap: 2,
    });
}

function bodyLines(lines, opts = {}) {
  lines.forEach((l) => bodyLine(l, opts));
}

// ---- 页头：姓名 ----
doc.font(FONT, FONT_TITLE).fillColor('#000000').text('高晟哲（Jimmy Gao）', LEFT, 52, { width: CONTENT_WIDTH });
doc.font(FONT, FONT_BODY).fillColor(LIGHT).text(
  '求职意向：AI 应用开发 / 物联网 / 全栈开发（实习）',
  LEFT,
  doc.y + 6,
  { width: CONTENT_WIDTH }
);

// ---- 联系方式 ----
sectionTitle('联系方式 CONTACT');
bodyLines([
  '电话：19229770095   邮箱：wzgsz2008@foxmail.com',
  'GitHub：github.com/jiostrider   LinkedIn：晟哲-高',
  '地址：中国山西省晋中市 太原理工大学',
], { size: FONT_BODY });

// ---- 教育背景 ----
sectionTitle('教育背景 EDUCATION');
bodyLines([
  '太原理工大学（211 双一流）  |  物联网工程 · 本科在读',
  '2026.09 - 2030.09（预计）',
], { size: FONT_BODY });

// ---- 专业技能 ----
sectionTitle('专业技能 SKILLS');
bodyLines([
  '• AI 工作流编排：多模型大语言模型协同、Prompt Engineering',
  '• 网页制作：React / Vite / Tailwind CSS、AI 辅助全栈开发',
  '• 演示设计：PPT 制作与动效演示、H5 交互页面',
  '• 电子创客：智能循迹小车、传感器应用、七段数码管显示',
], { size: FONT_BODY });

// ---- 项目经历 ----
sectionTitle('项目经历 PROJECTS');
const projects = [
  ['CET-4 英语四级在线模拟系统', '在线四级模拟考试应用，支持真题练习与成绩反馈。', 'https://cet-4-online.netlify.app/'],
  ['《飞机大战》网页游戏', '经典飞行射击游戏复刻，独立完成的交互游戏。', 'https://feijidazhan0.netlify.app/'],
  ['《小恐龙跑酷》', '跑酷类网页游戏，独立开发。', 'https://xiaokonglong01.netlify.app/'],
  ['《坦克大战·GSZ战场》', '坦克对战网页游戏，独立开发。', 'https://jiostrider.github.io/tank/'],
];
projects.forEach(([title, desc, url]) => {
  bodyLine(`${title} — ${desc}`, { size: FONT_BODY });
  bodyLine(url, { size: FONT_META, color: LIGHT, indent: 14 });
  doc.moveDown(0.35);
});

// ---- 荣誉认证 ----
sectionTitle('荣誉认证 CERTIFICATES');
const certs = [
  '达摩院 AI 培训师认证（AIT260809225938000178）',
  '人工智能训练师（高级）  2026.08.19',
  '阿里云 Apsara Clouder · VISION 人工智能设计（入门）',
  '阿里云 Apsara Clouder · 基于百炼平台构建智能体应用',
  '阿里云 Apsara Clouder · Spring AI 应用开发（入门）',
  '阿里云 Apsara Clouder · 基于 PAI ArtLab 的 AIGC 设计基础',
  '中国美术学院社会美术水平考级 · 素描捌级  2020.09.17',
];
bodyLines(certs.map((c) => `• ${c}`), { size: FONT_BODY });

// ---- 社会实践 ----
sectionTitle('社会实践 SOCIAL PRACTICE');
bodyLines([
  '• 温州市鹿城区白鹿亭慈善联合会志愿活动（2021.11.28）',
  '• 白鹿亭慈善联合会志愿义工活动（2022.10.03）',
], { size: FONT_BODY });

// ---- 个人简介 ----
sectionTitle('个人简介 PROFILE');
bodyLines([
  '太原理工大学物联网工程本科在读，对人工智能应用开发充满热情，擅长多模型大语言模型协同工作流，能够独立完成网页应用与电子创客项目。',
  '自我要求：系统化逻辑思维、永远谦卑、永远进步。',
], { size: FONT_BODY });

doc.end();

const stream = fs.createWriteStream(OUT);
doc.pipe(stream);
stream.on('finish', () => {
  const size = (fs.statSync(OUT).size / 1024).toFixed(1);
  console.log(`已生成：${OUT}（${size} KB）`);
});
