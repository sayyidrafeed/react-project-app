## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: Bun
- **Libraries**: 
  - `framer-motion` (Animations)
  - `lucide-react` (Icons)
  - `react-router-dom` (Routing)
  - `zod` (Validation)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

### Build

```bash
bun run build
```

## Recommended Folder Structure

To maintain a clean and scalable codebase, we follow this folder structure:

```text
src/
├── assets/             # Static assets (images, fonts, global icons)
├── components/         # Reusable UI components
│   ├── ui/             # Essential UI primitives (buttons, inputs, cards)
│   ├── common/         # Shared components used across multiple pages
│   └── forms/          # Form-related components and validations
├── context/            # React Context providers (Auth, Theme, etc.)
├── data/               # Static data, constants, and mock data
├── hooks/              # Custom React hooks
├── layouts/            # Page layout components (Dashboard, Auth, etc.)
├── pages/              # Page components mapped to routes
├── services/           # Data fetching and external API integrations
├── types/              # TypeScript type definitions and interfaces
├── utils/              # Helper functions and utilities
├── App.tsx             # Main application component & Routing
├── main.tsx            # Entry point
└── index.css           # Global styles & Tailwind configuration
```

## Best Practices

1.  **Component Co-location**: Keep files related to a component (styles, tests, types) in the same folder if they grow large.
2.  **Modular Components**: Aim for small, focused components that do one thing well.
3.  **Strict Typing**: Leverage TypeScript for all components and utilities to prevent runtime errors.
4.  **Semantic HTML**: Use proper HTML tags for accessibility and SEO.
5.  **Environment Variables**: Use `.env.example` to document required environment variables. Never commit secret keys in `.env`.
