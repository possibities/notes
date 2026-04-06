# VitePress 知识库部署执行清单

> 目标：将仓库 `notes` 部署为一个可公开访问、可持续维护、基于 GitHub Pages 的 VitePress 静态知识库。
>
> 执行原则：每一阶段都必须通过验收后才能进入下一阶段。任一检查失败，立即停止，先修复，再继续。

------

## 0. 固定约束

- 仓库名固定为 `notes`
- 站点类型固定为 GitHub Pages 项目站点，不是用户主页站点
- 访问地址固定为 `https://你的用户名.github.io/notes/`
- 文档根目录固定为 `docs/`
- VitePress 配置目录固定为 `docs/.vitepress/`
- 部署方式固定为 GitHub Actions，不使用手工推送 `gh-pages` 分支
- Node.js 版本不得低于 `20`

### 禁止事项

- 不得跳过 `base: '/notes/'` 配置
- 不得在内容中使用站点根绝对路径引用静态资源
- 不得在构建失败的情况下继续配置 Pages
- 不得在未本地构建通过前直接推送上线
- 不得手工修改部署产物目录 `docs/.vitepress/dist`

------

## 1. 完成标准

只有同时满足以下条件，才算部署完成：

- 仓库 `notes` 已成功推送到 GitHub 默认分支 `main`
- GitHub Actions 部署工作流最近一次执行状态为成功
- 仓库 Pages 来源已设置为 `GitHub Actions`
- 线上地址 `https://你的用户名.github.io/notes/` 可访问
- 首页样式正常，无静态资源 404
- 站内搜索可用
- 至少一篇文档页面可正常打开

------

## 2. 环境核验清单

### 2.1 本机环境

- [ ] `node -v` 输出版本大于等于 `v20`
- [ ] `npm -v` 可正常输出版本号
- [ ] `git --version` 可正常输出版本号
- [ ] 已完成 GitHub 登录，并具备创建仓库权限

### 2.2 必须记录的执行结果

- [ ] Node.js 版本已记录
- [ ] Git 版本已记录
- [ ] GitHub 用户名已确认无误

### 2.3 未通过时的处理

- 若 `node -v` 小于 `20`，停止执行，先升级 Node.js
- 若 Git 未安装，停止执行，先安装 Git
- 若无法创建 GitHub 仓库，停止执行，先处理账号权限

------

## 3. 项目初始化清单

### 3.1 创建项目

在空目录中执行：

```bash
mkdir notes
cd notes
npm init -y
npm add -D vitepress
npx vitepress init
```

### 3.2 初始化时的约束

- [ ] 文档目录必须选择 `docs`
- [ ] 配置目录必须生成在 `docs/.vitepress/`
- [ ] `package.json` 中必须生成以下脚本：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}
```

### 3.3 初始化完成后的目录验收

必须至少存在以下文件或目录：

```text
notes/
├── docs/
│   ├── index.md
│   └── .vitepress/
│       └── config.*
└── package.json
```

### 3.4 未通过时的处理

- 若未生成 `docs/.vitepress/config.*`，停止执行，重新初始化
- 若脚本名称不是 `docs:dev` / `docs:build` / `docs:preview`，立即修正后再继续

------

## 4. 配置文件执行清单

### 4.1 必须修改的配置

打开 `docs/.vitepress/config.*`，确保最终配置至少包含以下关键项：

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的知识库',
  description: '知识沉淀与文档索引',
  base: '/notes/',
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

### 4.2 配置验收规则

- [ ] `base` 必须严格等于 `'/notes/'`
- [ ] `title` 与 `description` 已填写，不保留默认占位文本
- [ ] `themeConfig.search.provider` 已显式设置为 `'local'`

### 4.3 关键说明

- `base` 错误会直接导致线上样式和资源路径失效
- 本地搜索不是“天然自动开启”，必须显式配置 `provider: 'local'`

------

## 5. 本地预览与构建验收清单

### 5.1 开发预览

执行：

```bash
npm run docs:dev
```

检查项：

- [ ] 首页可以在本地正常打开
- [ ] 页面无明显报错
- [ ] 样式正常加载

### 5.2 生产构建

执行：

```bash
npm run docs:build
```

检查项：

- [ ] 构建命令返回成功
- [ ] 已生成 `docs/.vitepress/dist/`

### 5.3 生产预览

执行：

```bash
npm run docs:preview
```

检查项：

- [ ] 预览页可正常打开
- [ ] 页面链接可点击跳转
- [ ] 搜索按钮出现且能检索到现有文档
- [ ] 浏览器开发者工具中无资源 404

### 5.4 未通过时的处理

- 若构建失败，禁止继续 GitHub 相关步骤
- 若本地预览样式异常，优先检查 `base`、资源引用路径、配置文件位置

------

## 6. Git 仓库初始化与首次提交清单

### 6.1 Git 初始化

在项目根目录执行：

```bash
git init
git branch -M main
git add .
git commit -m "init: scaffold vitepress site"
```

### 6.2 提交前检查

- [ ] 当前目录为 `notes` 根目录
- [ ] `git status` 无意外二进制文件
- [ ] 未将本地构建产物作为手工维护对象处理

### 6.3 建议忽略项

若尚未生成 `.gitignore`，补充以下内容：

```gitignore
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/
```

------

## 7. GitHub 仓库创建清单

### 7.1 仓库必须满足

- [ ] 仓库名严格为 `notes`
- [ ] 可见性为 `Public`
- [ ] 不勾选自动初始化 `README`、`.gitignore`、`LICENSE`

### 7.2 远程仓库绑定

执行：

```bash
git remote add origin https://github.com/你的用户名/notes.git
git push -u origin main
```

### 7.3 推送后的验收

- [ ] GitHub 仓库页面已出现项目文件
- [ ] 默认分支为 `main`
- [ ] `docs/`、`package.json`、配置文件均已上传

### 7.4 未通过时的处理

- 若远程仓库地址错误，先修正 `origin` 再推送
- 若仓库名不是 `notes`，停止继续，先统一仓库名与 `base`

------

## 8. 部署工作流清单

### 8.1 新建工作流文件

创建文件 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 20
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 8.2 工作流强制检查项

- [ ] 构建命令必须是 `npm run docs:build`
- [ ] 上传路径必须是 `docs/.vitepress/dist`
- [ ] Pages 权限块必须存在
- [ ] `deploy` 任务必须依赖 `build`

### 8.3 提交工作流

执行：

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add pages deployment workflow"
git push
```

------

## 9. GitHub Pages 开启清单

### 9.1 Pages 设置

进入：

```text
仓库 → Settings → Pages
```

执行：

- [ ] `Build and deployment > Source` 选择 `GitHub Actions`

### 9.2 验收规则

- [ ] 触发一次 Actions 执行
- [ ] `build` 任务成功
- [ ] `deploy` 任务成功
- [ ] 仓库 Pages 页面显示已发布地址

### 9.3 禁止事项

- 不要再选择 `Deploy from a branch`
- 不要手工创建或推送 `gh-pages` 分支

------

## 10. 线上验收清单

等待 GitHub Actions 完成后，逐项检查：

- [ ] 打开 `https://你的用户名.github.io/notes/` 成功
- [ ] 首页样式正常
- [ ] 控制台无资源 404
- [ ] 随机打开至少 1 篇文档页面，内容显示正常
- [ ] 搜索可检索到页面标题或正文关键词
- [ ] 移动端宽度下页面布局未崩坏

### 10.1 常见失败信号与定位方向

| 现象 | 优先检查项 |
| --- | --- |
| 首页无样式 | `base` 是否为 `'/notes/'` |
| Actions 构建失败 | Node 版本、脚本名、依赖安装是否正常 |
| 页面 404 | Pages 来源是否为 `GitHub Actions`，工作流是否成功 |
| 搜索按钮不出现 | `themeConfig.search.provider` 是否已配置为 `local` |
| 图片不显示 | 是否使用了错误的绝对路径 |

------

## 11. 日常更新执行清单

### 11.1 新增文档

- [ ] 在 `docs/` 下创建 Markdown 文件
- [ ] 文件命名语义化，避免空格和中文标点
- [ ] 文档标题与文件内容一致

### 11.2 提交前本地检查

执行：

```bash
npm run docs:build
```

确认：

- [ ] 本地构建成功
- [ ] 新页面可被搜索
- [ ] 新增链接无死链

### 11.3 提交与发布

执行：

```bash
git add .
git commit -m "docs: add new article"
git push
```

发布验收：

- [ ] GitHub Actions 自动触发
- [ ] 最新部署成功
- [ ] 线上页面已可访问

------

## 12. 可选项：自定义域名执行清单

### 12.1 执行前提

- [ ] 已经完成默认域名部署并验证可访问
- [ ] 你拥有目标域名的 DNS 管理权限

### 12.2 推荐做法

- [ ] 优先使用 `www` 子域名，而不是裸域
- [ ] 先在 GitHub 中验证域名所有权

### 12.3 DNS 配置

- 若使用子域名，例如 `kb.example.com`：
  - [ ] 在 DNS 中添加 `CNAME` 指向 `你的用户名.github.io`
- 若使用裸域，例如 `example.com`：
  - [ ] 在 DNS 中添加 `A` / `ALIAS` / `ANAME` 记录

### 12.4 GitHub 配置

- [ ] 在仓库 `Settings → Pages` 中填写自定义域名
- [ ] 等待证书签发完成
- [ ] 开启 `Enforce HTTPS`

### 12.5 约束说明

- 使用 GitHub Actions 作为 Pages 来源时，不以手工维护 `CNAME` 文件作为首选方案
- 若域名尚未生效，不要提前开启强制 HTTPS

------

## 13. 最终复核清单

上线前最后一次逐项核对：

- [ ] 仓库名是 `notes`
- [ ] `base` 是 `'/notes/'`
- [ ] 本地构建成功
- [ ] 工作流配置存在且已推送
- [ ] Pages 来源是 `GitHub Actions`
- [ ] 线上地址可访问
- [ ] 搜索可用
- [ ] 至少一篇文档验证通过

全部勾选后，才视为任务完成。

------

## 14. 核对依据

以下做法已按官方文档核对后收敛为本清单：

- VitePress 部署到 GitHub Pages 的官方流程
- VitePress 本地搜索需要显式启用 `provider: 'local'`
- GitHub Pages 当前推荐使用 `GitHub Actions` 作为发布来源
- GitHub 自定义域名配置建议优先验证域名并优先使用 `www` 子域
