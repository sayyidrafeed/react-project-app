# Testing Guide

**Scope**: `src/__tests__/`, `e2e/`  
**Tools**: Bun Test (unit), Playwright (E2E), Testing Library

---

## Structure

```
__tests__/
├── components/           # Component tests mirror src structure
│   ├── ui/
│   │   ├── Button.test.tsx
│   │   └── Input.test.tsx
│   └── layouts/
│       └── Sidebar.test.tsx
├── context/
│   └── AuthContext.test.tsx
├── hooks/
│   └── useFormValidation.test.ts
├── test-utils.tsx        # Custom render helpers
└── setup.ts              # Test setup
```

---

## Test Patterns

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '../../components/ui/Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Hook Testing
```tsx
import { renderHook, act } from '@testing-library/react';
import { useFormValidation } from '../../hooks/useFormValidation';

describe('useFormValidation', () => {
  it('validates on submit', () => {
    const { result } = renderHook(() => useFormValidation(...));
    
    act(() => {
      result.current.handleSubmit();
    });
    
    expect(result.current.errors).toBeDefined();
  });
});
```

### Context Testing
```tsx
import { renderHook } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../context/AuthContext';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

const { result } = renderHook(() => useAuth(), { wrapper });
```

---

## Commands

```bash
# Unit tests
bun test

# With coverage
bun test --coverage

# E2E tests
bunx playwright test

# E2E UI mode (debug)
bunx playwright test --ui
```

---

## Coverage

Current coverage: **82.55%**  
Goal: Maintain >80% coverage for all new code.

---

## Notes

- Use `happy-dom` for DOM testing
- Mock external dependencies
- Test user interactions, not implementation
- Write tests before or alongside components
