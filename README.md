# HoneyBear Folio Website

The official website for [HoneyBear Folio](https://github.com/honeybearfolio/HoneyBear-Folio), a privacy-focused personal finance desktop application.

## Tech Stack

- **[Hugo](https://gohugo.io/)** - Static site generator
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Bun](https://bun.sh/)** - JavaScript runtime and package manager

## Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) (v0.123.0+)
- [Bun](https://bun.sh/) (v1.0+)

### Setup

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

The site will be available at `http://localhost:1313`.

### Build

```bash
# Build for production
bun run build
```

The output will be in the `public/` directory.

## Project Structure

```
├── assets/
│   └── css/
│       └── main.css          # Tailwind CSS source
├── content/
│   └── docs/                 # Documentation pages
├── static/
│   ├── icon.png             # App icon
│   └── overview.png         # App screenshot
├── themes/
│   └── honeybear/           # Custom Hugo theme
│       ├── assets/
│       │   └── css/
│       ├── layouts/
│       │   ├── _default/
│       │   ├── partials/
│       │   └── index.html
│       └── theme.toml
├── hugo.toml                 # Hugo configuration
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json
```

## Deployment

This site can be deployed to any static hosting service:

- **GitHub Pages** - Use the included GitHub Actions workflow
- **Netlify** - Connect your repo and set build command to `bun run build`
- **Vercel** - Similar to Netlify

### GitHub Pages

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: 'latest'
          extended: true
      - run: hugo --minify
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## License

MIT License - see [LICENSE](LICENSE) for details.
