import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Notes',
  description: 'Knowledge base and documentation index',
  base: '/notes/',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/guide/getting-started' },
      { text: '内容发布', link: '/guide/content-publishing' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '文件加入知识库并上线', link: '/guide/content-publishing' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: '页面目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新'
    },
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright 2026'
    }
  }
})
