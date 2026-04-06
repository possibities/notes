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
      { text: '内容发布', link: '/guide/content-publishing' },
      { text: 'Web', link: '/web/' },
      { text: 'C++', link: '/c++/' }
    ],
    sidebar: [
      {
        text: '指南',
        items: [
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '文件加入知识库并上线', link: '/guide/content-publishing' }
        ]
      },
      {
        text: 'Web',
        items: [
          { text: '总览', link: '/web/' },
          { text: 'HTML 与 CSS', link: '/web/html-css' },
          { text: '互联网基础', link: '/web/Internet' },
          { text: 'JavaScript', link: '/web/JavaScript' },
          { text: 'Node.js', link: '/web/NodeJs' }
        ]
      },
      {
        text: 'C++',
        items: [
          { text: '总览', link: '/c++/' },
          { text: 'C++ 笔记', link: '/c++/C++' }
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
