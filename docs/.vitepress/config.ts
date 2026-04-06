import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Notes',
  description: 'Knowledge base and documentation index',
  base: '/notes/',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/guide/getting-started' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    lastUpdated: {
      text: 'Last updated'
    },
    footer: {
      message: 'Built with VitePress',
      copyright: 'Copyright 2026'
    }
  }
})
