// @ts-ignore
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../../components/ui/Badge';

describe('Badge Component', () => {
  // Test: Renders children
  it('should render children content', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeDefined();
  });

  // Test: Variant - primary (default)
  it('should apply primary variant by default', () => {
    const { container } = render(<Badge>Primary</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-primary')).toBe(true);
  });

  // Test: Variant - secondary
  it('should apply secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-secondary')).toBe(true);
  });

  // Test: Variant - success
  it('should apply success variant', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-success')).toBe(true);
  });

  // Test: Variant - warning
  it('should apply warning variant', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-warning')).toBe(true);
  });

  // Test: Variant - error
  it('should apply error variant', () => {
    const { container } = render(<Badge variant="error">Error</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-error')).toBe(true);
  });

  // Test: Variant - info
  it('should apply info variant', () => {
    const { container } = render(<Badge variant="info">Info</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-info')).toBe(true);
  });

  // Test: Size - sm
  it('should apply sm size with correct classes', () => {
    const { container } = render(<Badge size="sm">Small</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('px-2')).toBe(true);
    expect(badge?.classList.contains('py-0.5')).toBe(true);
    expect(badge?.classList.contains('text-[10px]')).toBe(true);
  });

  // Test: Size - md (default)
  it('should apply md size by default', () => {
    const { container } = render(<Badge>Medium</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('px-2.5')).toBe(true);
    expect(badge?.classList.contains('py-1')).toBe(true);
    expect(badge?.classList.contains('text-xs')).toBe(true);
  });

  // Test: Size - lg
  it('should apply lg size with correct classes', () => {
    const { container } = render(<Badge size="lg">Large</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('px-3')).toBe(true);
    expect(badge?.classList.contains('py-1.5')).toBe(true);
    expect(badge?.classList.contains('text-sm')).toBe(true);
  });

  // Test: Custom className
  it('should apply custom className', () => {
    const { container } = render(<Badge className="custom-class">Custom</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('custom-class')).toBe(true);
  });

  // Test: Combined variant and size
  it('should apply both variant and size classes', () => {
    const { container } = render(
      <Badge variant="success" size="lg">
        Success Large
      </Badge>
    );
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge-success')).toBe(true);
    expect(badge?.classList.contains('px-3')).toBe(true);
    expect(badge?.classList.contains('py-1.5')).toBe(true);
  });

  // Test: Always has badge base class
  it('should always include badge base class', () => {
    const { container } = render(<Badge>Badge</Badge>);
    const badge = container.querySelector('span');
    expect(badge?.classList.contains('badge')).toBe(true);
  });

  // Test: Renders as span element
  it('should render as a span element', () => {
    const { container } = render(<Badge>Span Badge</Badge>);
    const badge = container.querySelector('span');
    expect(badge).toBeDefined();
    expect(badge?.tagName).toBe('SPAN');
  });

  // Test: Complex children
  it('should render complex children (JSX)', () => {
    render(
      <Badge>
        <strong>Bold Text</strong>
      </Badge>
    );
    expect(screen.getByText('Bold Text')).toBeDefined();
  });
});
