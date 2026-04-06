# Getting Started

This page exists to verify the basic site behavior:

- the sidebar renders
- the route is reachable
- local search indexes body text
- the deployed site renders correctly on GitHub Pages

## Fixed Constraints

- repository name is `notes`
- production base is `/notes/`
- deployment uses GitHub Actions

## Daily Update Flow

1. Add or change Markdown files under `docs/`.
2. Run `npm run docs:build` locally.
3. Commit and push to `main`.
4. Wait for GitHub Actions to publish.

## Search Check Keyword

If the search box can find the phrase `search check keyword`, indexing works.
