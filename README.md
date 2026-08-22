# 高晟哲 · Jimmy Gao — 个人作品集网站

一个沉浸式的个人作品集网站，包含交互式作品展示、技能介绍、证书资质、演示文稿轮播、AI 助手抽屉等模块。

## 技术栈

- **React 18** + **Vite 5** — 前端框架与构建工具
- **Tailwind CSS 4** — 样式方案
- **Framer Motion** — 动画与过渡效果
- **Swiper** — 演示文稿轮播
- **HLS.js** — 背景视频流播放
- **Lucide React** — 图标库

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器（默认 http://localhost:5173）
npm run dev

# 生产构建
npm run build

# 本地预览构建产物
npm run preview
```

## 项目结构

```
├── public/               # 静态资源（图片、简历 PDF）
├── scripts/              # 构建辅助脚本（图片/视频/PDF 生成）
├── src/
│   ├── assets/           # 音频、图片、视频资源
│   ├── components/       # React 组件
│   ├── hooks/            # 自定义 Hooks
│   ├── App.jsx           # 应用入口组件
│   ├── main.jsx          # 入口文件
│   └── index.css         # 全局样式
├── .github/workflows/    # GitHub Actions（自动部署到 GitHub Pages）
├── .gitignore
├── index.html
├── package.json
├── vercel.json           # Vercel 部署配置
└── vite.config.js        # Vite 配置
```

## 部署

- **GitHub Pages**：推送到 `main` 分支后，通过 [deploy.yml](.github/workflows/deploy.yml) 自动构建并部署。
- **Vercel**：项目已配置 [vercel.json](vercel.json)，可在 Vercel 控制台直接导入仓库部署。

## 联系方式

- 邮箱：wzgsz2008@foxmail.com
- GitHub：[jiostrider](https://github.com/jiostrider)
- LinkedIn：[高晟哲](https://www.linkedin.com/in/晟哲-高-62503742a/)
