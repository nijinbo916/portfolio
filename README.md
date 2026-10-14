# 前端作品集 · Portfolio

> Web 开发技术 · 第四次课作业 —— 用 HTML + CSS + JavaScript 制作的个人前端作品展示页面，
> 收录前三次作业（注册页 / Quiz Game / 菜单搜索器）与一次接口版加练（Recipe Finder），
> 每个作品均附**真实线上截图**、在线访问地址与源码仓库。

## 在线预览

- **Vercel 线上地址**：<https://portfolio-theta-one-aig3koben9.vercel.app/>
- **GitHub Pages 备用地址**：<https://nijinbo916.github.io/portfolio/>（国内可直连；`*.vercel.app` 存在 DNS 污染，打不开时用这个）
- **GitHub 仓库地址**：<https://github.com/nijinbo916/portfolio>

## 收录的作品

| # | 作品 | 说明 | 在线访问 | 源码 |
| --- | --- | --- | --- | --- |
| 01 | 用户注册页 | 表单校验 / 密码强度 / Toast | <https://register-page-tau.vercel.app/> | <https://github.com/nijinbo916/register-page> |
| 02 | Quiz Game | 洗牌 / 限时 / SVG 分数环 / 错题复盘 | <https://quiz-game-plum-ten.vercel.app/> | <https://github.com/nijinbo916/quiz-game> |
| 03 | 菜单搜索器 | 多维筛选 / 高亮 / 快捷键 | <https://menu-searcher-lemon.vercel.app/> | <https://github.com/nijinbo916/menu-searcher> |
| 04 | Recipe Finder | fetch 调 TheMealDB / async-await | <https://recipe-finder-hazel-three.vercel.app/> | <https://github.com/nijinbo916/recipe-finder> |

## 功能

- **作品卡片** — 截图 + 简介 + 技术标签 + 「在线访问 / 源码」双入口，悬停上浮动效
- **截图灯箱** — 点击卡片截图可放大查看，`Esc` 或点击遮罩关闭
- **滚动入场** — IntersectionObserver 驱动的淡入动画，老浏览器自动降级
- **导航高亮** — 滚动到对应区块时顶部导航自动高亮
- **响应式** — 桌面双列 → 平板单列 → 手机单列；尊重 `prefers-reduced-motion`

## 目录结构

```
portfolio/
├── index.html          页面结构：导航 / Hero / 作品 / 技术栈 / 关于 / 页脚
├── css/style.css       设计变量、卡片网格、灯箱、入场动画、响应式
├── js/main.js          灯箱交互、IntersectionObserver 入场与导航高亮
├── assets/shots/       四个作品的真实线上截图（无头浏览器采集）
└── README.md
```

## 实现要点

- 截图统一 1280×800 视口采集，卡片内用 `aspect-ratio + object-fit: top` 裁切对齐
- 灯箱用 `[hidden]` + `body` 滚动锁，避免背景跟着滚动
- 全站无任何框架与外部依赖，CSS 变量统一配色

## 本地运行

直接双击 `index.html` 即可；或起一个静态服务：

```bash
python -m http.server 8080
# 打开 http://localhost:8080
```

## 部署

1. 推送到 GitHub 仓库
2. Vercel 导入该仓库（纯静态，配置保持默认）
3. 仓库 Settings → Pages 开启 `main / (root)` 作为备用入口
