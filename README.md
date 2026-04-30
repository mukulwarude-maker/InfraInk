## DevOps Pulse — Animated DevOps Blog

A premium animated static blogging website for DevOps-related content, built with **Gatsby**, **Tailwind CSS**, and **GSAP**.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Gatsby 5](https://www.gatsbyjs.com/) | Static site generator |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [GSAP](https://gsap.com/) | Animations and interactive effects |
| Markdown + `gatsby-transformer-remark` | Blog post content |
| PrismJS | Syntax highlighting for code blocks |

## Features

- ⎈ **Hero Section** — GSAP entrance animations (staggered title words, terminal widget reveal, CTA/stats fade-in)
- 📰 **Featured Posts** — Scroll-triggered card animations with a 1-large + 2-small grid
- 🏷️ **Categories** — 8 DevOps topic categories with hover lift animations
- 📬 **Newsletter** — Animated subscribe form with success state
- 🕐 **Recent Posts** — Paginated post grid with scroll reveal
- 🦶 **Footer** — Organized link columns with brand section
- 📝 **Blog Post Template** — Full article view with syntax highlighting, prev/next navigation

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
cd devops-blog
npm install
```

### Develop

```bash
npm run develop
# → http://localhost:8000
```

### Build

```bash
npm run build
```

### Serve Built Site

```bash
npm run serve
# → http://localhost:9000
```

## Adding a New Blog Post

1. Create a new Markdown file in `content/posts/`:

```
content/posts/my-new-post.md
```

2. Add frontmatter:

```yaml
---
title: "My New DevOps Post"
date: "2026-05-01"
category: "Kubernetes"
categoryColor: "#326CE5"
emoji: "⎈"
tags: ["kubernetes", "devops"]
author: "Your Name"
readTime: "8 min read"
excerpt: "A short description of the post."
---

Your content here in Markdown...
```

3. Gatsby will automatically generate a page at `/blog/my-new-post/`.

4. To feature the post in the UI cards, add it to `src/data/posts.js`.

## Project Structure

```
devops-blog/
├── content/
│   └── posts/           # Markdown blog posts
├── src/
│   ├── components/
│   │   ├── layout.js    # Site wrapper
│   │   ├── navbar.js    # Navigation bar (GSAP entrance)
│   │   ├── hero.js      # Hero section (GSAP timeline)
│   │   ├── featured-posts.js  # Featured posts grid
│   │   ├── categories.js      # Category cards
│   │   ├── recent-posts.js    # Recent posts grid
│   │   ├── newsletter.js      # Email subscribe section
│   │   ├── footer.js          # Site footer
│   │   └── post-card.js       # Reusable post card
│   ├── data/
│   │   └── posts.js     # Static post data for UI cards
│   ├── pages/
│   │   ├── index.js     # Homepage
│   │   └── 404.js       # 404 page
│   ├── templates/
│   │   └── blog-post.js # Blog post template
│   └── styles/
│       └── global.css   # Tailwind + custom CSS
├── static/
│   └── images/          # Static images
├── gatsby-config.js     # Gatsby + plugin config
├── gatsby-node.js       # Dynamic page generation
├── tailwind.config.js   # Tailwind theme
├── postcss.config.js    # PostCSS config
└── package.json
```

## Design System

The blog uses a dark, terminal-inspired DevOps aesthetic:

- **Background**: `#0d1117` (GitHub dark)
- **Surface**: `#161b22` (elevated cards)
- **Accent Blue**: `#58a6ff` (neon blue)
- **Accent Green**: `#39d353` (terminal green)
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code/labels)

## Animations (GSAP)

| Section | Animation |
|---------|-----------|
| Navbar | Slide down + fade on mount |
| Hero title | Word-by-word stagger with skew |
| Hero badge/CTAs | Scale + fade with spring ease |
| Terminal widget | Line-by-line reveal |
| Featured cards | Scroll-triggered stagger |
| Category cards | Scroll-triggered stagger + GSAP hover lift |
| Newsletter section | Scroll-triggered scale + fade |
| Blog post header | Staggered content reveal |
