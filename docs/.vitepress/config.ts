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
          { text: 'B/S 方向预备课', link: '/web/BS' },
          { text: 'HTML 与 CSS', link: '/web/html-css' },
          { text: '互联网基础', link: '/web/Internet' },
          { text: 'JavaScript', link: '/web/JavaScript' },
          { text: 'Node.js', link: '/web/NodeJs' },
          { text: '后端路线规划', link: '/web/%E5%90%8E%E7%AB%AF%E8%B7%AF%E7%BA%BF%E8%A7%84%E5%88%92' },
          { text: '部署 Hexo 框架博客', link: '/web/%E9%83%A8%E7%BD%B2hexo%E6%A1%86%E6%9E%B6%E5%8D%9A%E5%AE%A2' }
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
