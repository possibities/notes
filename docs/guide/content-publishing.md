# 文件加入知识库并上线

这篇文档说明如何把新文件加入当前知识库，并通过 GitHub Pages 自动上线。

## 适用范围

本项目当前采用：

- `VitePress`
- `GitHub Pages`
- `GitHub Actions`

这意味着“上传文件”不是在网站后台点按钮完成，而是把文件放进仓库，再通过 `git push` 发布。

## 一句话流程

1. 把文档、图片或附件放到正确目录。
2. 在 Markdown 中正确引用它们。
3. 本地执行 `npm run docs:build`。
4. 提交并推送到 `main`。
5. 等待 GitHub Actions 发布完成。

## 目录规范

### 文档文件

Markdown 文档统一放在 `docs/` 下。

示例：

```text
docs/
├── index.md
├── guide/
│   ├── getting-started.md
│   └── content-publishing.md
```

### 图片文件

图片统一放在 `docs/public/images/` 下。

建议继续按主题或日期分子目录，例如：

```text
docs/public/images/
├── guide/
├── screenshots/
└── 2026-04/
```

### 附件文件

附件统一放在 `docs/public/attachments/` 下。

适合存放：

- PDF
- ZIP
- Office 文件
- 可下载模板

示例：

```text
docs/public/attachments/
├── onboarding.pdf
├── checklist.xlsx
└── template.zip
```

## 新增一篇文章

例如新增一篇“图片上传规范”：

1. 在 `docs/guide/` 下新建文件 `image-rules.md`
2. 写入 Markdown 内容
3. 如需显示在导航中，更新 `docs/.vitepress/config.ts`

示例：

```md
# 图片上传规范

这里是正文内容。
```

## 图片上传规范

### 命名规范

图片文件名使用：

- 小写字母
- 数字
- 连字符 `-`

不要使用：

- 空格
- 中文文件名
- 中文标点
- `final`, `new`, `tmp` 这类临时命名

推荐：

```text
hero-banner.png
deploy-flow-01.png
settings-pages-screenshot.webp
```

不推荐：

```text
最终版本.png
新图片 1.png
截图（最新）.png
```

### 格式建议

- 截图优先使用 `png` 或 `webp`
- 照片优先使用 `webp` 或 `jpg`
- 图标或简单图形优先使用 `svg`
- 单个图片尽量控制在 `500 KB` 以内

### 引用方式

因为资源放在 `docs/public/` 下，引用时从站点根路径开始写。

示例：

```md
![Pages 设置截图](/images/guide/pages-settings.png)
```

不要写成磁盘路径，也不要写仓库本地相对物理路径。

错误示例：

```md
![错误示例](G:\code\vibecoding\notes\docs\public\images\guide\pages-settings.png)
![错误示例](docs/public/images/guide/pages-settings.png)
```

## 附件上传规范

### 命名规范

附件文件名同样使用小写字母、数字和连字符。

推荐：

```text
deployment-checklist.pdf
content-template.docx
starter-files.zip
```

### 引用方式

附件放在 `docs/public/attachments/` 后，可在 Markdown 中直接链接：

```md
[下载部署清单](/attachments/deployment-checklist.pdf)
```

### 使用边界

适合放入仓库的附件：

- 项目模板
- 说明文档
- 小体积 PDF
- 与知识库强相关的下载资料

不建议放入仓库的附件：

- 超大视频
- 大型压缩包
- 高频更新的二进制文件
- 敏感或私密文件

如果文件很大，优先放到对象存储、网盘或发行页，再在文档中放链接。

## 上线前检查

新增或修改内容后，在项目根目录执行：

```bash
npm run docs:build
```

确认以下事项：

- 构建成功
- 页面无报错
- 图片路径可正常访问
- 附件链接没有写错
- 新页面能被搜索到

## 提交与上线

在项目根目录执行：

```bash
git add .
git commit -m "docs: add content"
git push
```

推送到 `main` 后：

- GitHub Actions 会自动执行
- Pages 会自动更新
- 一般 1 到 3 分钟可在线访问

## 常见错误

### 图片不显示

优先检查：

- 文件是否真的放在 `docs/public/images/`
- Markdown 路径是否写成 `/images/...`
- 文件名大小写是否一致

### 附件点不开

优先检查：

- 文件是否真的放在 `docs/public/attachments/`
- 链接是否写成 `/attachments/...`
- 文件扩展名是否写错

### 页面没有出现在侧边栏

这是导航配置问题，不是上传失败。需要更新 `docs/.vitepress/config.ts` 里的 `sidebar`。

## 推荐工作方式

对当前项目，建议始终按这个顺序操作：

1. 先放文件
2. 再写引用
3. 本地构建检查
4. 提交
5. 推送
6. 检查 GitHub Actions
7. 检查线上页面
