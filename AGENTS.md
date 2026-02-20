# SIERA Frontend Knowledge Base

**Project**: SIERA - Mentorship Management System (PKKMB-U Platform)  
**Generated**: 2026-02-20  
**Tech Stack**: React 19 + Vite + TypeScript + Tailwind CSS 4 + Bun  
**Architecture**: Feature-based Clean Architecture

---

## Overview

SIERA is a mentorship and event management platform for university orientation (PKKMB-U) with role-based access (admin, mentor, mentee). The codebase follows feature-based architecture where each domain owns its components, types, and logic.

---

## Project Structure

```
src/
├── main.tsx              # Entry point
├── App.tsx               # Router + route definitions
├── components/           # Reusable UI components
│   ├── ui/               # Primitives (Button, Input, Card, Modal)
│   ├── common/           # Shared components (ErrorBoundary, ProtectedRoute)
│   └── forms/            # Form components with validation
├── features/             # Feature-based modules
│   ├── admin-events/     # Event management (CRUD, filters, sorting)
│   ├── mentee/           # Mentee dashboard components
│   └── landing/          # Landing page sections
├── layouts/              # Page layouts
│   ├── DashboardLayout.tsx
│   ├── AuthLayout.tsx
│   └── PublicLayout.tsx
├── pages/                # Route-mapped pages
│   ├── admin/            # Admin pages
│   ├── mentee/           # Mentee pages
│   └── mentor/           # Mentor pages
├── context/              # React Context providers
│   ├── AuthContext.tsx   # Authentication state
│   └── ThemeContext.tsx  # Theme state
├── hooks/                # Custom React hooks
├── types/                # Shared TypeScript types
├── data/                 # Mock data
└── utils/                # Helper utilities
```

---

## Where to Look

| Task | Location | Notes |
|------|----------|-------|
| Add new route | `src/App.tsx` | Use ProtectedRoute for auth-required routes |
| Create UI component | `src/components/ui/` | Export from same file, use `cn()` for classes |
| Add feature module | `src/features/{feature}/` | Co-locate components, types, UI |
| Form validation | `src/components/forms/` | Use ValidatedForm, ValidatedInput patterns |
| Auth logic | `src/context/AuthContext.tsx` | useAuth hook for consuming |
| Role-based routes | `src/App.tsx` + `ProtectedRoute` | allowedRoles: ['admin' \| 'mentor' \| 'mentee'] |
| Mock data | `src/data/` | mockData.ts, mockEvents.ts |
| Unit tests | `src/__tests__/` | Mirror src structure |
| E2E tests | `e2e/` | Playwright tests |

---

## Conventions

### File Naming
- PascalCase for components: `Button.tsx`, `EventManagement.tsx`
- camelCase for hooks/utilities: `useFormValidation.ts`
- Barrel exports in folders: `components/ui/validation/index.ts`

### Component Patterns
```tsx
// Props interface extends HTML attributes
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

// Use cn() for Tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// React.FC with explicit children type
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ... }) => { ... }

// Default export at end
export default Button;
```

### Styling Conventions
- Use custom Tailwind classes defined in `index.css`:
  - `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`
  - `card`, `card-elevated`, `card-outlined`
  - `input-field`, `input-error`
  - Color tokens: `text-upn-green`, `bg-upn-gold`
- Always use `cn()` for conditional classes
- Framer Motion for page transitions and animations

### Type Patterns
```typescript
// Shared types in src/types/
export interface Event { ... }

// Feature-specific types in feature folder
// src/features/admin-events/types/event.ts

// Use Zod for runtime validation
import { z } from 'zod';
```

### Context Pattern
```tsx
// Always provide custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

---

## Commands

```bash
# Development
bun dev

# Build
bun run build

# Testing
bun test                    # Unit tests
bun test --coverage         # With coverage
bunx playwright test        # E2E tests

# Linting/Formatting
bun run lint                # oxlint
bun run format              # oxlint --fix
```

---

## Anti-Patterns (Avoid These)

1. **Don't use relative imports crossing features**  
   Bad: `features/mentee importing from features/admin-events`  
   Good: Move shared code to `components/common/` or `types/`

2. **Don't suppress TypeScript errors**  
   Never use: `as any`, `@ts-ignore`, `@ts-expect-error`

3. **Don't use console.log in production**  
   Linter warns on `no-console`. Remove or use proper logging.

4. **Don't create circular dependencies**  
   Features should not import from each other.

5. **Don't bypass ProtectedRoute**  
   All role-restricted routes must use `<ProtectedRoute allowedRoles={[...]}>`

---

## Quick Reference

### Routing
```tsx
// In App.tsx - Role-based route
<Route path="/admin/events" element={
  <ProtectedRoute allowedRoles={['admin']}>
    <AdminEvents />
  </ProtectedRoute>
} />
```

### Form with Validation
```tsx
import { ValidatedForm } from '../components/forms/ValidatedForm';

<ValidatedForm
  fields={[...]}
  onSubmit={handleSubmit}
  validationSchema={schema}
/>
```

### Auth Hook
```tsx
const { user, login, logout, isAuthenticated } = useAuth();
```

---

## Notes

- **Strict TypeScript**: `strict: true`, `noUnusedLocals: true`
- **No Backend**: Uses mock data in `src/data/` (demo purposes)
- **Test Coverage**: 82.55% (140 unit tests)
- **Husky**: Pre-commit hooks configured
- **Oxlint**: Fast linter replacing ESLint
