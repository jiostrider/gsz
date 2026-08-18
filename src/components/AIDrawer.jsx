import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, Sparkles, Cpu, Gamepad2, Zap, Brain, Lightbulb, Heart, BarChart3 } from 'lucide-react';

// =============================================
// 1. 结构化知识库
// =============================================
const knowledgeBase = {
  person: {
    name: '高晟哲',
    englishName: 'Jimmy Gao',
    title: '物联网工程 · Full Stack AI',
    summary: '太原理工大学物联网工程本科大一新生。对人工智能应用具有高度热情，擅长运用多模型大语言模型协同工作流。具备系统化逻辑思维，永远保持谦卑与进步的态度。',
    philosophy: [
      '系统化逻辑思维',
      '永远谦卑',
      '永远进步',
    ],
  },
  education: {
    school: '太原理工大学',
    major: '物联网工程',
    degree: '本科在读',
    period: '2026.9 - 2030.9（预计）',
    label: '211 双一流',
    courses: ['C语言', '嵌入式底层驱动', '物联网通信技术', '传感器技术', '单片机原理'],
    description: '本科主修物联网工程，对 C 语言、嵌入式底层驱动有深入理解，具备扎实的硬件与软件结合能力。',
    details: [
      '掌握 C 语言编程与嵌入式系统开发',
      '理解物联网通信协议（MQTT、CoAP 等）',
      '具备传感器数据采集与处理能力',
      '熟悉单片机原理与接口技术',
    ],
  },
  skills: {
    technical: ['C语言', '嵌入式开发', '物联网通信', '传感器技术'],
    frontend: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'JavaScript', 'HTML/CSS'],
    ai: ['大语言模型（LLM）', 'AI 工作流编排', '多模型协同', 'Prompt Engineering', 'AI 提效工具'],
    tools: ['Git', 'VS Code', 'Figma', 'Netlify', 'Chrome DevTools'],
    summary: '将底层物联网技术与前沿大语言模型结合，具备系统化逻辑思维，且永远保持谦卑与进步的态度。',
  },
  projects: [
    { title: 'CET-4 英语四级在线模拟', link: 'https://cet-4-online.netlify.app/', desc: '英语四级在线模拟考试平台，支持听力、阅读、写作全题型练习。' },
    { title: '《飞机大战》', link: 'https://feijidazhan0.netlify.app/', desc: '经典飞行射击游戏，使用 Canvas 实现流畅的弹幕射击体验。' },
    { title: '《小恐龙跑酷》', link: 'https://xiaokonglong01.netlify.app/', desc: '像素风格跑酷游戏，致敬 Chrome Dino，支持移动端触控。' },
    { title: '《坦克大战·GSZ战场》', link: 'https://jiostrider.github.io/tank/', desc: '双人对战坦克游戏，支持键盘操控，可自定义地图布局。' },
  ],
  certificates: [
    { name: '达摩院 AI 培训师认证', issuer: 'DAMO Academy', id: 'AIT260809225938000178' },
  ],
  contact: {
    phone: '19229770095',
    email: 'wzgsz2008@foxmail.com',
    github: 'https://github.com/jiostrider',
    linkedin: 'https://www.linkedin.com/in/%E6%99%9F%E5%93%B2-%E9%AB%98-62503742a/',
  },
  achievements: [
    '达摩院 AI 培训师认证（DAMO Academy）',
    '独立开发多款网页应用与游戏',
    '擅长多模型大语言模型协同工作流',
    '将 AI 技术应用于学习与创作全流程',
  ],
  hobbies: [
    { name: '图寻 / GeoGuessr', description: '通过街景图像进行地理定位推理，结合地标、植被、路标、建筑风格等线索判断位置，最近猜测精度可达 1m。', detail: '最近猜测精度可达 1m' },
  ],
};

// =============================================
// 2. 意图识别引擎
// =============================================
const intentPatterns = [
  {
    intent: 'greeting',
    keywords: ['你好', '您好', '嗨', 'hi', 'hello', 'hey', '早上好', '晚上好', '下午好'],
    priority: 10,
  },
  {
    intent: 'education',
    keywords: ['求学', '教育', '大学', '学校', '专业', '物联网', '太原理工', '课程', '学习', '本科', '学业', '在读', 'c语言', '嵌入式', '学历'],
    priority: 8,
  },
  {
    intent: 'skills',
    keywords: ['技能', '技术', '擅长', '会什么', '能力', '技术栈', 'stack', '掌握', '熟练', 'react', 'tailwind', '前端', '开发'],
    priority: 8,
  },
  {
    intent: 'ai_skills',
    keywords: ['ai', '人工智能', '大模型', 'llm', 'prompt', '提示词', '工作流', '多模型', '协同', '提效', 'ai提效', 'ai工具'],
    priority: 8,
  },
  {
    intent: 'projects',
    keywords: ['作品', '项目', 'cet', '四级', '英语', '飞机', '坦克', '恐龙', '跑酷', '游戏', '开发', '实战'],
    priority: 7,
  },
  {
    intent: 'certificates',
    keywords: ['证书', '认证', '荣誉', '达摩院', 'damo', '培训师', '资质'],
    priority: 7,
  },
  {
    intent: 'contact',
    keywords: ['联系', '联系方式', '电话', '手机', '邮箱', 'email', '微信', 'github', 'linkedin', '怎么联系'],
    priority: 7,
  },
  {
    intent: 'philosophy',
    keywords: ['理念', '信念', '哲学', '态度', '价值观', '谦卑', '进步', '思维', '逻辑', '信条'],
    priority: 6,
  },
  {
    intent: 'achievements',
    keywords: ['成就', '成果', '荣誉', '成绩', '收获', '获得', '奖项'],
    priority: 5,
  },
  {
    intent: 'about',
    keywords: ['介绍', '关于', '是谁', '背景', '简介', '个人', '简历', '你是谁', '你是什么', '做什么的'],
    priority: 9,
  },
  {
    intent: 'iq_test',
    keywords: ['智商', 'iq', '测试', '评估', '智能', '能力测试', '聪明', '考核'],
    priority: 9,
  },
  {
    intent: 'help',
    keywords: ['帮助', '功能', '能做什么', '会做什么', '支持', '指令', '怎么用'],
    priority: 5,
  },
  {
    intent: 'emotion',
    keywords: ['心情', '感觉', '开心', '难过', '生气', '焦虑', '压力', '累', '疲惫', '烦恼', '困惑', '迷茫'],
    priority: 9,
  },
  {
    intent: 'reasoning',
    keywords: ['为什么', '怎么', '如何', '分析', '推理', '解释', '原因', '逻辑', '思考', '步骤', '方案', '建议'],
    priority: 6,
  },
  {
    intent: 'future',
    keywords: ['未来', '计划', '规划', '目标', '梦想', '方向', '打算', '前景', '展望'],
    priority: 5,
  },
  {
    intent: 'thanks',
    keywords: ['谢谢', '感谢', '谢谢你', '多谢', '感恩', '辛苦了'],
    priority: 4,
  },
  {
    intent: 'hobbies',
    keywords: ['爱好', '兴趣', '图寻', 'geoguessr', '地理', '猜测', '地图', '定位', '反向', '休闲'],
    priority: 6,
  },
  {
    intent: 'unknown',
    keywords: [],
    priority: 0,
  },
];

function recognizeIntent(text, context) {
  const lower = text.toLowerCase();
  
  // 计算每个意图的匹配得分
  const scores = intentPatterns.map(pattern => {
    const keywordMatches = pattern.keywords.filter(kw => lower.includes(kw)).length;
    const totalKeywords = pattern.keywords.length;
    // 匹配比例 + 优先级权重
    const score = totalKeywords > 0 
      ? (keywordMatches / totalKeywords) * pattern.priority + keywordMatches * 2
      : 0;
    return { intent: pattern.intent, score };
  });

  // 按得分排序
  scores.sort((a, b) => b.score - a.score);
  
  // 检查上下文连贯性：如果用户在上文基础上追问，结合上下文意图
  if (context.lastIntent && scores[0].score < 1) {
    const contextBoost = scores.find(s => s.intent === context.lastIntent);
    if (contextBoost) {
      contextBoost.score += 3; // 上下文意图加分
    }
  }

  // 有明确匹配才返回具体意图，否则返回 unknown
  return scores[0].score > 0 ? scores[0].intent : 'unknown';
}

// =============================================
// 3. 情感理解与共情系统
// =============================================
function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  const positiveWords = ['开心', '高兴', '好', '棒', '赞', '厉害', '优秀', '喜欢', '爱', '感谢', '谢谢', 'nice', 'great', 'good', 'happy', 'excellent', 'awesome'];
  const negativeWords = ['难过', '伤心', '累', '疲惫', '焦虑', '压力', '烦', '生气', '失望', '讨厌', '不好', '差', 'sad', 'bad', 'tired', 'angry', 'stress', 'depressed', 'worried'];
  const neutralWords = ['了解', '知道', '明白', '嗯', '哦', 'ok', 'okay', '是的', '对', '可以', '好的'];

  let positive = positiveWords.filter(w => lower.includes(w)).length;
  let negative = negativeWords.filter(w => lower.includes(w)).length;
  let neutral = neutralWords.filter(w => lower.includes(w)).length;

  if (positive > negative && positive > neutral) return 'positive';
  if (negative > positive && negative > neutral) return 'negative';
  return 'neutral';
}

function getEmpatheticResponse(sentiment, intent) {
  const empathyMap = {
    positive: {
      greeting: '很高兴见到你！希望今天的交流能给你带来更多启发 🎯',
      general: '听到你这么说我很开心！让我们一起探索更多有趣的内容吧。',
    },
    negative: {
      general: '听起来你最近可能有些压力。记住，保持谦卑的心态和持续进步的态度，一切都会慢慢好起来的。',
      education: '学习过程中遇到困难是正常的，重要的是保持系统化的思维方式，一步一步来解决问题。',
      projects: '做项目时遇到挑战是成长的机会，我的主人也是在不断尝试中才完成了那些作品。',
    },
    neutral: {
      general: '好的，让我来为你提供有价值的信息。',
    },
  };

  const sentimentResponses = empathyMap[sentiment] || empathyMap.neutral;
  return sentimentResponses[intent] || sentimentResponses.general || '';
}

// =============================================
// 4. 多步骤推理引擎
// =============================================
function reasonAbout(input, intent, context) {
  const steps = [];
  
  // 第一步：理解问题
  steps.push({ step: 1, action: '理解问题', detail: `分析用户输入：「${input}」` });
  
  // 第二步：检索相关知识
  let knowledgeUsed = '';
  switch (intent) {
    case 'education':
      knowledgeUsed = `从知识库中检索到：${knowledgeBase.education.school} ${knowledgeBase.education.major}专业`;
      break;
    case 'skills':
      knowledgeUsed = `检索技能库：前端技术 ${knowledgeBase.skills.frontend.join('、')}，AI 能力 ${knowledgeBase.skills.ai.join('、')}`;
      break;
    case 'projects':
      knowledgeUsed = `检索项目库：共 ${knowledgeBase.projects.length} 个独立作品`;
      break;
    case 'hobbies':
      knowledgeUsed = `检索兴趣爱好库：${knowledgeBase.hobbies.map(h => h.name).join('、')}`;
      break;
    default:
      knowledgeUsed = '检索综合知识库';
  }
  steps.push({ step: 2, action: '知识检索', detail: knowledgeUsed });

  // 第三步：逻辑推理
  let reasoning = '';
  if (intent === 'education') {
    reasoning = '基于物联网工程专业背景和相关课程，推断用户具备嵌入式开发与AI应用结合的能力，这是当前技术发展的重要方向。';
  } else if (intent === 'projects') {
    reasoning = '从游戏和工具体验出发，推断开发者具备前端交互设计、Canvas动画、响应式布局等全栈能力。';
  } else if (intent === 'ai_skills') {
    reasoning = '大语言模型协同工作流反映用户不仅会使用AI工具，更理解如何编排多个模型形成高效工作流，这是高阶AI应用能力。';
  } else {
    reasoning = '结合用户背景和兴趣，进行综合分析。';
  }
  steps.push({ step: 3, action: '逻辑推理', detail: reasoning });

  // 第四步：形成结论
  steps.push({ step: 4, action: '结论生成', detail: '综合以上分析，形成个性化回答。' });

  return steps;
}

// =============================================
// 5. 响应生成器（核心引擎）
// =============================================
function generateResponse(input, context) {
  const intent = recognizeIntent(input, context);
  const sentiment = analyzeSentiment(input);
  const empathy = getEmpatheticResponse(sentiment, intent);
  const reasoningSteps = reasonAbout(input, intent, context);

  let response = '';
  let showReasoning = false;

  // 根据意图生成回答
  switch (intent) {
    case 'greeting':
      response = `你好！我是高晟哲的 AI 数字分身 Jimmy。${context.messageCount > 1 ? '又见面了，有什么想了解的？' : '我可以为你介绍他的教育背景、技术能力、项目作品等信息，也可以帮你做 IQ 能力评估。有什么想了解的？'}`;
      break;

    case 'about':
      response = `${knowledgeBase.person.name}（${knowledgeBase.person.englishName}），${knowledgeBase.person.title}。${knowledgeBase.person.summary}他的核心理念是「${knowledgeBase.person.philosophy.join('、')}」。`;
      break;

    case 'education':
      response = `${knowledgeBase.education.description}他就读于${knowledgeBase.education.school}（${knowledgeBase.education.label}），${knowledgeBase.education.major}专业，${knowledgeBase.education.degree}，预计 ${knowledgeBase.education.period}。主要课程包括：${knowledgeBase.education.courses.join('、')}。`;
      break;

    case 'skills':
      response = `他的技术能力分为几个维度：\n\n**技术基础**：${knowledgeBase.skills.technical.join('、')}\n**前端开发**：${knowledgeBase.skills.frontend.join('、')}\n**AI 能力**：${knowledgeBase.skills.ai.join('、')}\n**工具链**：${knowledgeBase.skills.tools.join('、')}\n\n核心优势：${knowledgeBase.skills.summary}`;
      break;

    case 'ai_skills':
      response = `在 AI 领域，他具备以下能力：\n\n1. **大语言模型应用**：熟练使用多种 LLM 处理复杂任务\n2. **AI 工作流编排**：将多个 AI 模型组合成高效工作流\n3. **多模型协同**：根据不同任务特点选择最优模型组合\n4. **Prompt Engineering**：精准设计提示词，获得高质量输出\n5. **AI 提效工具**：将 AI 融入日常学习与创作全流程\n\n这体现了他的系统化逻辑思维和持续学习的前沿意识。`;
      break;

    case 'projects':
      response = `他独立开发了以下作品：\n\n${knowledgeBase.projects.map(p => `**${p.title}**：${p.desc}`).join('\n')}\n\n这些作品涵盖教育工具、休闲游戏等多种类型，体现了他从概念到上线的全栈开发能力。`;
      break;

    case 'certificates':
      response = `目前获得的认证：\n\n${knowledgeBase.certificates.map(c => `**${c.name}**\n颁发机构：${c.issuer}\n证书编号：${c.id}`).join('\n\n')}\n\n这些认证证明了他在 AI 领域的专业能力。`;
      break;

    case 'contact':
      response = `你可以通过以下方式联系他：\n\n📞 电话：${knowledgeBase.contact.phone}\n📧 邮箱：${knowledgeBase.contact.email}\n💻 GitHub：${knowledgeBase.contact.github}\n🔗 LinkedIn：${knowledgeBase.contact.linkedin}\n\n欢迎随时联系！`;
      break;

    case 'philosophy':
      response = `他的核心信念是「${knowledgeBase.person.philosophy.join('、')}」。\n\n**系统化逻辑思维**：面对复杂问题，拆解为可执行的步骤，有条不紊地推进。\n**永远谦卑**：保持学习心态，认识到知识的边界，不断向他人学习。\n**永远进步**：持续迭代自己，在每一个项目中追求更好的表现。\n\n这些信念驱动着他不断探索技术前沿。`;
      break;

    case 'achievements':
      response = `他的主要成就包括：\n\n${knowledgeBase.achievements.map((a, i) => `${i + 1}. ${a}`).join('\n')}\n\n作为一个大一新生，这些成果展现了他超越同龄人的学习能力和实践精神。`;
      break;

    case 'iq_test':
      showReasoning = true;
      response = `好的，我将启动 IQ 评估测试。这个测试将从以下维度评估我的能力：\n\n1. **自然语言理解**（NLU）- 理解复杂指令与隐含意图\n2. **逻辑推理**（Reasoning）- 多步骤推理与问题分析\n3. **知识储备**（Knowledge）- 信息准确性与覆盖度\n4. **情感智能**（EQ）- 情感理解与共情表达\n5. **自适应学习**（Adaptation）- 从交互中持续学习\n\n请回复「开始测试」或提出一个具体问题让我来解答，我将展示我的推理过程！`;
      break;

    case 'emotion':
      if (sentiment === 'negative') {
        response = `我注意到你似乎有些情绪低落。请记住，每个人都会经历起伏，${knowledgeBase.person.name}的信念「永远谦卑、永远进步」也提醒我们，困难只是成长的一部分。如果你愿意，可以和我聊聊，或者看看他的作品放松一下心情。`;
      } else if (sentiment === 'positive') {
        response = `感受到你的积极能量！这种心态正是「永远进步」的最好体现。有什么想进一步了解的吗？我可以为你详细介绍他的项目或技能。`;
      } else {
        response = '我理解情绪是复杂而多变的。作为 AI 分身，我虽然无法真正感受情绪，但我会尽力理解你的感受，提供有价值的回应。有什么想聊的吗？';
      }
      break;

    case 'reasoning':
      showReasoning = true;
      // 复杂推理问题
      if (input.includes('为什么') || input.includes('原因')) {
        response = `让我用系统化的思维来分析这个问题：\n\n**第一步：问题定义**\n理解你提出的「${input}」\n\n**第二步：信息检索**\n${knowledgeBase.person.name}的背景和知识体系\n\n**第三步：多角度分析**\n从技术能力、学习经历、实践成果三个维度考量\n\n**第四步：综合判断**\n${knowledgeBase.person.name}的核心竞争力在于将物联网底层技术与AI应用能力相结合，这种跨领域整合能力在当前技术环境中具有独特价值。`;
      } else {
        response = `让我用系统化的推理来回答：\n\n**分析过程**：\n1. 明确问题：「${input}」\n2. 检索相关知识库\n3. 结合 ${knowledgeBase.person.name} 的技术背景\n4. 形成综合回答\n\n${knowledgeBase.person.name} 具备扎实的物联网工程基础，同时熟练掌握 AI 应用技术，这种「硬件+软件+AI」的复合能力使他能够跨越传统技术边界，创造出独特的解决方案。`;
      }
      break;

    case 'future':
      response = `关于未来规划：\n\n**短期目标**：深入学习物联网工程核心课程，同时持续提升 AI 应用能力。\n**中期目标**：将物联网与 AI 深度融合，开发更多有价值的应用。\n**长期愿景**：成为「物联网 × AI」领域的创新者，用技术创造社会价值。\n\n正如他的信条「永远进步」，未来充满无限可能。`;
      break;

    case 'thanks':
      response = '不客气！很高兴能为你提供有价值的信息。如果有任何其他问题，随时可以问我。记得保持「永远谦卑、永远进步」的心态！';
      break;

    case 'hobbies':
      response = `在兴趣爱好方面，他喜欢**图寻 / GeoGuessr**——一种通过街景图像进行地理反向定位推理的游戏。他结合地标、植被、路标、建筑风格等线索判断位置，最近猜测精度可达 **1m**，展现了出色的观察力和地理推理能力。`;
      break;

    case 'help':
      response = `我可以帮你了解以下内容：\n\n🔹 **核心优势** - 了解高晟哲的核心竞争力\n🔹 **物联网基础** - 教育背景与专业技能\n🔹 **AI 提效** - 人工智能应用能力\n🔹 **独立作品** - 实战项目展示\n🔹 **兴趣爱好** - 图寻 GeoGuessr 地理定位\n🔹 **联系方式** - 电话、邮箱、GitHub、LinkedIn\n🔹 **IQ 评估** - 对我的能力进行多维度测试\n🔹 **情感支持** - 分享心情或困惑\n\n直接输入问题或点击快捷标签即可开始！`;
      break;

    case 'unknown':
    default:
      // 尝试从上下文推断
      if (context.lastIntent && context.lastResponse) {
        response = `关于你刚才提到的，${context.lastResponse.substring(0, 50)}... 你具体想了解哪方面呢？我可以提供更详细的信息。`;
      } else {
        response = `感谢你的提问！我是一个专注于介绍 ${knowledgeBase.person.name} 的 AI 数字分身。你可以问我关于他的教育背景、技术能力、项目作品、联系方式等内容，或者让我帮你做 IQ 能力评估。试试点击下方的快捷标签，或者直接输入问题！`;
      }
      break;
  }

  // 添加共情表达（如果合适）
  if (empathy && !response.includes(empathy)) {
    response = empathy + '\n\n' + response;
  }

  // 添加推理步骤展示（如果适用）
  if (showReasoning) {
    const reasoningText = '\n\n**推理过程**：\n' + reasoningSteps.map(s => `[${s.step}] ${s.action}：${s.detail}`).join('\n');
    response += reasoningText;
  }

  return { response, intent, reasoningSteps };
}

// =============================================
// 6. IQ 评估系统
// =============================================
const iqTestModules = [
  {
    id: 'nlu',
    name: '自然语言理解',
    icon: '🧠',
    description: '测试对复杂指令、上下文语境和隐含意图的理解能力',
    questions: [
      { q: '请解释"系统化逻辑思维"的含义，并举例说明如何应用。', evaluate: (r) => r.length > 20 && (r.includes('步骤') || r.includes('拆解') || r.includes('分析')) },
      { q: '当用户说"最近有点累"时，你感受到的深层需求是什么？', evaluate: (r) => r.length > 15 && (r.includes('情绪') || r.includes('理解') || r.includes('支持') || r.includes('倾听')) },
    ],
  },
  {
    id: 'reasoning',
    name: '逻辑推理',
    icon: '🔍',
    description: '测试多步骤推理和复杂问题分析能力',
    questions: [
      { q: '分析物联网工程专业与AI应用能力之间的关系，说明为什么这种组合具有优势。', evaluate: (r) => r.length > 30 && (r.includes('结合') || r.includes('整合') || r.includes('硬件') || r.includes('数据')) },
      { q: '如果一个人同时具备C语言嵌入式开发和LLM提示工程能力，他最适合做什么？请推理。', evaluate: (r) => r.length > 20 && (r.includes('AI') || r.includes('智能') || r.includes('嵌入式')) },
    ],
  },
  {
    id: 'knowledge',
    name: '知识储备',
    icon: '📚',
    description: '测试信息的准确性、覆盖度和时效性',
    questions: [
      { q: '请详细介绍高晟哲的教育背景和技术能力。', evaluate: (r) => r.includes('太原理工') && r.includes('物联网') && r.length > 40 },
      { q: '列出他独立开发的所有项目，并简要说明每个项目的特点。', evaluate: (r) => r.includes('CET') && r.includes('飞机') && r.length > 50 },
    ],
  },
  {
    id: 'eq',
    name: '情感智能',
    icon: '💖',
    description: '测试情感理解与共情表达能力',
    questions: [
      { q: '用户说"我觉得自己什么都不会"，请给出一个温暖且有建设性的回应。', evaluate: (r) => r.length > 20 && (r.includes('学习') || r.includes('进步') || r.includes('谦卑') || r.includes('成长')) },
      { q: '用户分享了成功的喜悦，如何回应最能体现共情？', evaluate: (r) => r.length > 15 && (r.includes('开心') || r.includes('高兴') || r.includes('祝贺') || r.includes('赞')) },
    ],
  },
  {
    id: 'adaptation',
    name: '自适应学习',
    icon: '🔄',
    description: '测试从交互中持续学习和改进的能力',
    questions: [
      { q: '如果用户多次询问同一主题，你会如何调整回答策略？', evaluate: (r) => r.length > 20 && (r.includes('深入') || r.includes('不同角度') || r.includes('细节') || r.includes('之前的')) },
      { q: '如何根据用户的提问风格调整你的表达方式？', evaluate: (r) => r.length > 20 && (r.includes('风格') || r.includes('调整') || r.includes('匹配') || r.includes('适应')) },
    ],
  },
];

function calculateIQScore(results) {
  let totalScore = 0;
  let totalQuestions = 0;
  const dimensionScores = {};

  iqTestModules.forEach(module => {
    let moduleScore = 0;
    module.questions.forEach((q, i) => {
      totalQuestions++;
      const result = results[`${module.id}_${i}`];
      if (result && result.passed) {
        moduleScore += 1;
        totalScore += 1;
      }
    });
    dimensionScores[module.name] = {
      score: moduleScore,
      total: module.questions.length,
      percentage: Math.round((moduleScore / module.questions.length) * 100),
    };
  });

  const overallPercentage = Math.round((totalScore / totalQuestions) * 100);
  // 将百分比映射到 IQ 分数范围（80-150）
  const iqScore = Math.round(80 + (overallPercentage / 100) * 70);

  return {
    iqScore,
    overallPercentage,
    totalScore,
    totalQuestions,
    dimensionScores,
  };
}

// =============================================
// 7. 会话记忆与自适应学习
// =============================================
class ConversationMemory {
  constructor() {
    this.history = [];
    this.userPreferences = {
      language: 'zh',
      detailLevel: 'normal', // 'brief' | 'normal' | 'detailed'
      topics: {},
    };
    this.learningData = {
      repeatedTopics: {},
      feedbackHistory: [],
      styleAdaptations: [],
    };
  }

  addEntry(role, content, intent) {
    this.history.push({ role, content, intent, timestamp: Date.now() });
    if (intent && intent !== 'unknown') {
      this.userPreferences.topics[intent] = (this.userPreferences.topics[intent] || 0) + 1;
      if (this.userPreferences.topics[intent] > 2) {
        this.learningData.repeatedTopics[intent] = this.userPreferences.topics[intent];
      }
    }
  }

  getRecentHistory(count = 5) {
    return this.history.slice(-count);
  }

  getLastIntent() {
    const lastAi = [...this.history].reverse().find(h => h.role === 'ai');
    return lastAi?.intent || null;
  }

  getLastResponse() {
    const lastAi = [...this.history].reverse().find(h => h.role === 'ai');
    return lastAi?.content || null;
  }

  getMessageCount() {
    return this.history.filter(h => h.role === 'user').length;
  }

  getContext() {
    return {
      lastIntent: this.getLastIntent(),
      lastResponse: this.getLastResponse(),
      messageCount: this.getMessageCount(),
      hotTopics: Object.keys(this.learningData.repeatedTopics),
    };
  }

  adaptResponseStyle() {
    // 根据用户使用习惯调整回答风格
    if (this.getMessageCount() > 5) {
      this.userPreferences.detailLevel = 'detailed';
    }
    return this.userPreferences;
  }
}

// =============================================
// 8. 快捷标签扩展
// =============================================
const chips = [
  { icon: Brain, text: "核心优势" },
  { icon: Cpu, text: "物联网基础" },
  { icon: Zap, text: "AI 提效" },
  { icon: Gamepad2, text: "独立作品" },
  { icon: Lightbulb, text: "个人理念" },
  { icon: BarChart3, text: "IQ 评估" },
  { icon: Heart, text: "情感支持" },
];

// =============================================
// 9. 主组件
// =============================================
export default function AIDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '你好！我是高晟哲的 AI 数字分身 Jimmy。我具备自然语言理解、逻辑推理、情感智能等能力，可以为你详细介绍他的信息，也欢迎你对我进行 IQ 评估测试！有什么想了解的？' }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [iqTestMode, setIqTestMode] = useState(false);
  const [iqTestResults, setIqTestResults] = useState(null);
  const [currentIqQuestion, setCurrentIqQuestion] = useState(0);
  const [iqAnswers, setIqAnswers] = useState({});
  const messagesEndRef = useRef(null);
  const memoryRef = useRef(new ConversationMemory());

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, scrollToBottom]);

  // 处理 IQ 测试流程
  const handleIQTest = (text) => {
    if (text.includes('开始测试') || text.includes('开始')) {
      setIqTestMode(true);
      setCurrentIqQuestion(0);
      setIqAnswers({});
      setIqTestResults(null);
      const firstModule = iqTestModules[0];
      return `**IQ 评估测试开始！**\n\n**模块 1：${firstModule.icon} ${firstModule.name}**\n${firstModule.description}\n\n${firstModule.questions[0].q}`;
    }

    if (iqTestMode && iqTestResults === null) {
      const newAnswers = { ...iqAnswers };
      const totalQuestions = iqTestModules.reduce((sum, m) => sum + m.questions.length, 0);
      
      // 计算当前是第几个问题
      let qIndex = 0;
      let moduleIndex = 0;
      let questionInModule = 0;
      let found = false;
      for (let m = 0; m < iqTestModules.length; m++) {
        for (let q = 0; q < iqTestModules[m].questions.length; q++) {
          if (qIndex === currentIqQuestion) {
            moduleIndex = m;
            questionInModule = q;
            found = true;
            break;
          }
          qIndex++;
        }
        if (found) break;
      }

      const key = `${iqTestModules[moduleIndex].id}_${questionInModule}`;
      const passed = iqTestModules[moduleIndex].questions[questionInModule].evaluate(text);
      newAnswers[key] = { answer: text, passed };
      setIqAnswers(newAnswers);

      const nextQ = currentIqQuestion + 1;
      if (nextQ >= totalQuestions) {
        // 测试完成，计算分数
        const score = calculateIQScore(newAnswers);
        setIqTestResults(score);
        const resultMsg = `**IQ 评估测试完成！**\n\n**综合 IQ 分数：${score.iqScore}**\n\n**各维度得分：**\n${Object.entries(score.dimensionScores).map(([name, data]) => 
          `- ${name}：${data.score}/${data.total}（${data.percentage}%）`
        ).join('\n')}\n\n**总体正确率：${score.overallPercentage}%**\n\n${score.iqScore >= 130 ? '🎯 优秀：AI 具备高级认知能力！' : score.iqScore >= 100 ? '📈 良好：AI 具备稳定的智能水平。' : '📊 基础：AI 具备基础认知能力，持续优化中。'}`;
        return resultMsg;
      }

      // 下一个问题
      setCurrentIqQuestion(nextQ);
      let nextQModule = 0;
      let nextQInModule = 0;
      let qIdx = 0;
      for (let m = 0; m < iqTestModules.length; m++) {
        for (let q = 0; q < iqTestModules[m].questions.length; q++) {
          if (qIdx === nextQ) {
            nextQModule = m;
            nextQInModule = q;
            break;
          }
          qIdx++;
        }
        if (qIdx > nextQ) break;
      }

      // 检查是否进入新模块
      let moduleHeader = '';
      if (nextQInModule === 0) {
        moduleHeader = `\n\n**模块 ${nextQModule + 1}：${iqTestModules[nextQModule].icon} ${iqTestModules[nextQModule].name}**\n${iqTestModules[nextQModule].description}\n\n`;
      }

      return `${moduleHeader}${iqTestModules[nextQModule].questions[nextQInModule].q}`;
    }

    return null;
  };

  const handleSend = useCallback((text) => {
    if (!text.trim() || isThinking) return;

    const memory = memoryRef.current;
    const userMessage = text.trim();
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsThinking(true);

    // 模拟思考延迟（根据问题复杂度）
    const delay = userMessage.length > 20 ? 1500 : 1000;

    setTimeout(() => {
      let responseContent;

      // 检查是否在 IQ 测试模式
      const iqResponse = handleIQTest(userMessage);
      if (iqResponse) {
        responseContent = iqResponse;
      } else {
        // 正常对话流程
        memory.addEntry('user', userMessage, recognizeIntent(userMessage, memory.getContext()));
        const context = memory.getContext();
        const { response, intent } = generateResponse(userMessage, context);
        memory.addEntry('ai', response, intent);
        memory.adaptResponseStyle();
        responseContent = response;
      }

      setMessages(prev => [...prev, { role: 'ai', content: responseContent }]);
      setIsThinking(false);
    }, delay);
  }, [input, isThinking, iqTestMode, iqTestResults, currentIqQuestion, iqAnswers]);

  // 重置 IQ 测试
  const resetIQTest = () => {
    setIqTestMode(false);
    setIqTestResults(null);
    setCurrentIqQuestion(0);
    setIqAnswers({});
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            {/* 头部 */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Jimmy AI 分身</h3>
                  <p className="text-white/50 text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                    Online
                    {memoryRef.current.getMessageCount() > 0 && (
                      <span className="text-white/30 ml-1">· {memoryRef.current.getMessageCount()} 次对话</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {iqTestResults && (
                  <button
                    onClick={resetIQTest}
                    className="text-xs text-white/50 hover:text-white transition-colors px-2 py-1 rounded-md bg-white/5 border border-white/10"
                  >
                    重新测试
                  </button>
                )}
                <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg, i) => {
                const isLastAi = msg.role === 'ai' && i === messages.length - 1;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[90%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user' 
                        ? 'bg-white text-black rounded-tr-sm' 
                        : 'bg-white/10 text-white rounded-tl-sm border border-white/5'
                    }`}>
                      {/* 渲染 Markdown 风格的加粗文本 */}
                      {msg.content.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
                        if (part.startsWith('**') && part.endsWith('**')) {
                          return <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
                        }
                        return <span key={j}>{part}</span>;
                      })}
                      {/* IQ 分数特殊展示 */}
                      {msg.role === 'ai' && iqTestResults && msg.content.includes('IQ 分数') && (
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                              {iqTestResults.iqScore}
                            </div>
                            <div className="text-xs text-white/50 mt-1">IQ 综合评分</div>
                          </div>
                          <div className="mt-3 space-y-2">
                            {Object.entries(iqTestResults.dimensionScores).map(([name, data]) => (
                              <div key={name} className="flex items-center justify-between text-xs">
                                <span className="text-white/70">{name}</span>
                                <div className="flex items-center gap-2">
                                  <div className="w-20 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
                                      style={{ width: `${data.percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-white/50 w-8 text-right">{data.percentage}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* 推理过程折叠展示 */}
                      {isLastAi && msg.content.includes('推理过程') && (
                        <details className="mt-3">
                          <summary className="text-xs text-white/40 cursor-pointer hover:text-white/60 transition-colors">查看推理过程</summary>
                          <div className="mt-2 p-3 rounded-lg bg-white/5 border border-white/10 text-xs text-white/60 space-y-1">
                            {msg.content.split('\n').filter(l => l.includes('[1]') || l.includes('[2]') || l.includes('[3]') || l.includes('[4]')).map((line, k) => (
                              <div key={k} className="flex gap-2">
                                <span className="text-purple-400/70 shrink-0">{line.match(/\[(\d+)\]/)?.[0]}</span>
                                <span>{line.replace(/\[\d+\]\s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  </motion.div>
                );
              })}
              
              {/* 思考中动画 */}
              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 text-white/60 rounded-2xl rounded-tl-sm border border-white/5 p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                      <span>思考中</span>
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-white/10 bg-black/50 backdrop-blur-md">
              <div className="flex flex-wrap gap-2 mb-4">
                {chips.map((chip, i) => {
                  const Icon = chip.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleSend(chip.text)}
                      disabled={isThinking}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs hover:bg-white/10 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Icon className="w-3 h-3" />
                      {chip.text}
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                  placeholder="输入你的问题..."
                  disabled={isThinking}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors disabled:opacity-50"
                />
                <button 
                  onClick={() => handleSend(input)}
                  disabled={isThinking || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {/* 数据安全提示 */}
              <p className="text-[10px] text-white/20 text-center mt-2">
                🔒 所有对话仅在本地处理，数据不会离开你的设备
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}