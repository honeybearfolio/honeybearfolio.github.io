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

## License

AGPL-3.0 License - see [LICENSE](LICENSE) for details.
