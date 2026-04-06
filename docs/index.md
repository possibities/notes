---
layout: home

hero:
  name: "Notes"
  text: "VitePress + GitHub Pages"
  tagline: "公开、静态、自动部署的知识库站点"
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 文件上传与上线
      link: /guide/content-publishing

features:
  - title: 低维护成本
    details: 内容用 Markdown 管理，推送到 main 后由 GitHub Actions 自动发布。
  - title: 本地搜索
    details: 已启用 VitePress 本地搜索，不需要额外接入第三方搜索服务。
  - title: 清晰结构
    details: 默认提供首页、指南页和资源目录，便于继续扩展为正式知识库。
---

# 首页说明

当前项目已经具备这些基础能力：

- 有首页
- 有指南页
- 有内容上传与上线说明
- 有侧边栏和顶部导航
- 有本地搜索
- 有 GitHub Pages 自动部署

后续只需要把内容放到 `docs/`，再提交并推送到 `main`。
