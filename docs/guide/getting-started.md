# 快速开始

这篇文档用于确认站点的基础功能已经正常：

- 侧边栏能正常显示
- 页面路由能正常访问
- 本地搜索能索引正文内容
- GitHub Pages 上线后页面能正确渲染

## 固定约束

- 仓库名固定为 `notes`
- 生产环境 `base` 固定为 `/notes/`
- 发布方式固定为 GitHub Actions

## 日常更新流程

1. 把 Markdown 文档放到 `docs/` 下。
2. 如果有图片或附件，放到 `docs/public/` 下。
3. 本地执行 `npm run docs:build`。
4. 提交并推送到 `main`。
5. 等待 GitHub Actions 自动发布。

## 延伸阅读

如果你要继续新增图片、附件或页面，请看：[文件加入知识库并上线](/guide/content-publishing)

## 搜索验证关键词

如果搜索框可以搜到“搜索验证关键词”这几个字，说明搜索索引已经正常工作。
