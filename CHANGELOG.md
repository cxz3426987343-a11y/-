# Changelog

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 的结构。

## [Unreleased]

### Added

- 项目级 `README.md`、`PROJECT.md` 和 `CHANGELOG.md`。
- `.gitignore`、`.gitattributes` 和 `.editorconfig`。
- Node.js、pnpm 版本约束和统一的 4176 开发端口。
- `pnpm check:assets` 静态素材完整性与 GitHub 大文件检查。
- Python 素材工具依赖文件 `requirements-tools.txt`。

### Changed

- 文案与运营素材预处理脚本改为通过命令行接收源目录，移除特定电脑的绝对路径。
- 增加 `pnpm check`，统一执行素材检查和生产构建。

### Security

- 完成疑似密钥、令牌、密码、私钥和绝对本地路径扫描。
- 记录网站主动公开的电话、邮箱和生日信息。
- 为大型视频配置 Git LFS，避免普通 Git 提交超过 GitHub 文件限制。

## [0.1.0] - 2026-08-17

### Added

- 个人信息、教育背景、能力档案和个人经历模块。
- 设计、视频、文案和运营四类作品展示。
- 全屏 Hero、交互动效、响应式布局和联系方式尾页。
- 二维码和商业文案隐私保护处理。

