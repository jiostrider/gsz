const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const outputDir = path.resolve(__dirname, '../src/assets/images');

const slides = [
  { num: '01', title: 'Freshman\'s Dilemma', subtitle: '封面 - The Paralysis of Choice', bg: '#1a1a2e', accent: '#e94560' },
  { num: '02', title: '原文段落展示', subtitle: 'Key Passage Analysis', bg: '#16213e', accent: '#0f3460' },
  { num: '03', title: '重点词汇讲解', subtitle: 'Key Vocabulary', bg: '#1a1a2e', accent: '#533483' },
  { num: '04', title: '长难句结构分析', subtitle: 'Complex Sentence Structure', bg: '#0f3460', accent: '#e94560' },
  { num: '05', title: '段落主旨 & 作用', subtitle: 'Main Idea & Function', bg: '#16213e', accent: '#533483' },
  { num: '06', title: '课堂讨论', subtitle: 'Class Discussion', bg: '#1a1a2e', accent: '#0f3460' },
];

async function generateSlide(slide, index) {
  const width = 1280;
  const height = 720;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, slide.bg);
  grad.addColorStop(1, '#0a0a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Decorative circles
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = slide.accent;
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.2, 200, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.8, 150, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  // Top accent line
  ctx.fillStyle = slide.accent;
  ctx.fillRect(60, 60, 80, 4);

  // Slide number
  ctx.fillStyle = 'rgba(255,255,255,0.15)';
  ctx.font = '120px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'top';
  ctx.fillText(slide.num, width - 60, 40);

  // Title
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 48px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(slide.title, 60, height / 2 - 30);

  // Subtitle
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = '24px "Helvetica Neue", Arial, sans-serif';
  ctx.fillText(slide.subtitle, 60, height / 2 + 40);

  // Bottom accent
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(60, height - 60, width - 120, 1);

  // Label
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '14px "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'bottom';
  ctx.fillText(`PPT Slide ${slide.num} / 06`, 60, height - 45);

  const filename = `Freshmans-Dilemma-The-Paralysis-of-Choice (1)_${slide.num}.jpg`;
  const buffer = canvas.toBuffer('image/jpeg', { quality: 0.85 });
  fs.writeFileSync(path.join(outputDir, filename), buffer);
  console.log(`Created: ${filename}`);
}

async function main() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  for (let i = 0; i < slides.length; i++) {
    await generateSlide(slides[i], i);
  }
  console.log('All PPT placeholder images created successfully!');
}

main().catch(console.error);