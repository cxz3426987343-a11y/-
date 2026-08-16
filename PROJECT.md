# PROJECT

本文档是后续人工开发者和 AI 开发工具进入项目时的首要上下文。修改前先阅读本文件，并保持现有视觉设计、内容顺序和交互行为，除非需求明确要求改变。

## 项目目标

- 以单页网站完整展示陈薪竹的个人经历与作品。
- 保持 PC 端高质量视觉体验，同时提供基本响应式适配。
- 所有核心内容和素材可随仓库迁移，在不同电脑上独立安装和运行。
- 将作品数据、组件逻辑和静态素材路径保持清晰，便于持续补充作品。

## 技术架构

- 构建工具：Vite 7
- UI：React 19
- 动效：CSS、GSAP，以及项目内自定义组件
- 样式：组件 CSS 文件和全局 `src/App.css`
- 路由：无路由库，使用页面锚点和组件内部状态
- 数据：JavaScript 数据文件，不依赖后端或数据库

主要页面锚点：

| 锚点 | 组件或位置 |
| --- | --- |
| `#hero` | `App.jsx` 首页 |
| `#strengths` | `App.jsx` 个人优势 |
| `#experience` | `App.jsx` 个人经历 |
| `#design` | `DesignPortfolio.jsx` |
| `#videoWorks` | `VideoPortfolio.jsx` |
| `#copywriting` | `CopywritingPortfolio.jsx` |
| `#operations` | `OperationsPortfolio.jsx` |
| `#contact` | `App.jsx` 联系方式尾页 |

## 内容源位置

| 内容 | 数据或组件 | 素材目录 |
| --- | --- | --- |
| 设计作品 | `src/designAssets.js` | `public/assets/design/` |
| 视频作品 | `src/VideoPortfolio.jsx` | `public/assets/video/` |
| 文案作品 | `src/copywritingAssets.js` | `public/assets/copywriting/` |
| 运营作品 | `src/operationsAssets.js` | `public/assets/operations/` |
| 个人经历 | `src/App.jsx` | `public/assets/experience/` |
| 头像与人物图 | `src/App.jsx` | `public/assets/portrait/`、`public/assets/contact/` |
| 品牌与软件图标 | 多个组件 | `public/assets/logos/` |

修改作品顺序时只调整对应数据数组，不重命名素材文件。新增、删除或重命名素材后必须运行 `pnpm check:assets`。

## 不可破坏的现有行为

- Hero 视频首次进入时播放，并按当前循环逻辑运行。
- 导航按现有锚点切换，联系按钮进入尾页。
- 个人能力档案保持可展开和可交互。
- 设计作品保持卡组入口和环绕式图片浏览。
- 视频作品通过电影票选择，保留声音、进度、音量、倍速和全屏，禁止下载入口。
- 文案作品点击文件夹后先播放纸张动画，再打开居中的连续下滑阅读栏；图片完整显示且不可裁剪。
- 运营作品保持手机解锁、应用和账号层级导航。
- 尾页保持现有横向排版、身份卡交叠和邮件入口。

## 文件保留策略

必须保留并纳入版本控制：

- `src/`
- `public/assets/`（完整离线运行必须保留；大型视频使用 Git LFS）
- `scripts/`
- `docs/`
- `index.html`
- `package.json`
- `pnpm-lock.yaml`
- `pnpm-workspace.yaml`
- `.gitignore`、`.gitattributes`、`.editorconfig`
- `README.md`、`PROJECT.md`、`CHANGELOG.md`
- `requirements-tools.txt`

可以重新生成，不应提交：

- `node_modules/`：由 `pnpm install --frozen-lockfile` 生成
- `dist/`：由 `pnpm build` 生成
- `.pnpm-store/`：pnpm 缓存
- `logs/`、`vite.log`、`vite.err`：运行日志
- `__pycache__/`：Python 缓存

不属于网站仓库：

- 根目录中的简历 `.docx`
- Office 自动生成的 `~$` 临时文件
- 用户电脑上的原始设计、文案和运营素材文件夹

## 当前已知的可选清理项

以下素材目前没有被 `src/` 引用，删除前仍建议人工打开确认：

- `public/assets/portrait/chen-xinzhu-real.jpg`
- `public/assets/contact/contact-portrait.jpg`
- `public/assets/contact/chongqing-university-logo.png`
- `public/assets/operations/douyin/profile.webp`

`src/AccordionGallery.jsx`、`src/AccordionGallery.css` 和 `src/DepthText.jsx` 当前未被运行入口引用，属于历史组件。为避免误删潜在复用代码，本次保留；后续可以在独立清理提交中删除。

## 隐私与安全

- 当前没有环境变量依赖，也没有发现密钥、密码或令牌。
- 电话、邮箱和生日在 `src/App.jsx` 中硬编码并公开显示。
- `scripts/process-design-assets.py` 保存二维码模糊区域配置。
- `scripts/prepare-copywriting-assets.py` 保存商业材料正文模糊逻辑。
- 任何替换过的商业图片、账号截图和二维码必须重新人工审查。
- 不要把原始未脱敏商业资料、个人证件原图或账号登录信息加入 Git。

## 标准修改流程

1. 阅读 `PROJECT.md` 和相关历史规格。
2. 使用 UTF-8 编辑，不改变现有中文编码。
3. 仅修改需求涉及的组件、数据和素材。
4. 运行 `pnpm check`。
5. 在 PC 和移动视口检查文字溢出、遮挡、空白和交互状态。
6. 更新 `CHANGELOG.md`。

## 媒体与部署

完整素材约 3.5 GB，主要来自视频。GitHub 上传必须使用 Git LFS。GitHub Pages、Vercel 和 Netlify 对大型静态文件或部署包有限制；正式部署建议把视频迁移到对象存储/CDN，并保持代码中的媒体映射集中管理。

