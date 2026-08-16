# 陈薪竹个人作品集

面向新媒体、内容策划、培训运营等岗位的单页个人作品集网站。项目使用 React 19、Vite 7 和原生 CSS 构建，包含个人介绍、经历、能力档案、设计、视频、文案、运营及联系方式模块。

## 快速开始

环境要求：

- Node.js 22.12 或更高版本
- pnpm 10 或更高版本（项目锁定使用 pnpm 11.19）
- Git LFS（克隆或上传完整视频素材时必须安装）

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

打开 <http://127.0.0.1:4176/>。

生产构建与本地预览：

```bash
pnpm check
pnpm preview
```

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 在 4176 端口启动开发服务器 |
| `pnpm build` | 生成 `dist/` 生产文件 |
| `pnpm preview` | 本地预览生产构建 |
| `pnpm check:assets` | 检查源码引用的素材是否完整，并列出超过 100 MB 的文件 |
| `pnpm check` | 先检查素材，再执行生产构建 |

## 项目结构

```text
.
├─ src/                      React 组件、页面样式和作品数据
├─ public/assets/            网站运行所需图片、视频、图标等静态素材
├─ scripts/                  素材预处理、隐私处理和完整性检查工具
├─ docs/superpowers/specs/   历史设计规格与交互决策记录
├─ index.html                Vite HTML 入口
├─ package.json              命令、依赖与运行环境约束
├─ pnpm-lock.yaml            可重复安装的依赖锁文件
├─ PROJECT.md                架构、维护规则和文件保留说明
└─ CHANGELOG.md              版本变化记录
```

当前本地目录还保存了多份简历 `.docx` 文件。它们不是网站运行依赖，已通过 `.gitignore` 排除，不会在执行 `git add .` 时进入网站仓库。

## 大型视频与 Git LFS

`public/assets/video/` 约 3.5 GB，多段视频超过 GitHub 普通文件 100 MB 上限。项目已在 `.gitattributes` 中将常见视频格式配置为 Git LFS。

首次提交前执行：

```bash
git lfs install
git lfs track "*.mp4" "*.m4v" "*.mov" "*.webm"
git add .gitattributes
```

克隆完整项目时执行：

```bash
git lfs install
git clone <repository-url>
cd <repository-folder>
git lfs pull
pnpm install --frozen-lockfile
pnpm dev
```

GitHub 仓库可以使用 LFS 保存这些文件，但面向公网部署时不建议直接依赖 GitHub Pages 提供数 GB 视频。长期方案是将视频放入对象存储/CDN（例如 Cloudflare R2、阿里云 OSS 或腾讯云 COS），网站中保留稳定的媒体 URL。

## 素材预处理

运行图片处理脚本需要 Python 3 和 Pillow：

```bash
python -m pip install -r requirements-tools.txt
python scripts/prepare-copywriting-assets.py "path/to/文案类作品"
python scripts/prepare-operations-assets.py "path/to/运营类作品"
```

脚本默认输出到项目的 `public/assets/`，不再依赖任何特定电脑的绝对路径。

## 隐私与公开信息

未发现 API Key、访问令牌、密码或私钥。网站源码中包含并公开展示以下个人信息：

- 电话：`18081589856`
- 邮箱：`cxz3426987343@163.com`
- 生日：`2001.12.04`

这些内容属于作品集功能，但公开 GitHub 仓库和正式部署前应再次确认。部分商业案例和二维码素材已经过模糊处理；替换原始素材后应重新检查隐私保护。

## 上传到 GitHub

1. 在 GitHub 创建一个空仓库，不要勾选自动生成 README。
2. 在本项目根目录安装并启用 Git LFS。
3. 初始化 Git、检查忽略文件并提交。
4. 添加远程仓库并推送。

```bash
git lfs install
git init
git add .
git status
git commit -m "chore: establish maintainable portfolio project"
git branch -M main
git remote add origin https://github.com/<your-account>/<repository>.git
git push -u origin main
```

执行 `git status` 时，应确认 `node_modules/`、`dist/`、日志、缓存和根目录中的简历 `.docx` 未进入暂存区。

更多架构与维护约束见 [PROJECT.md](./PROJECT.md)。
