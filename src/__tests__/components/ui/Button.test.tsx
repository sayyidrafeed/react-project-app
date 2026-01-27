// @ts-ignore - Bun test types not available in tsc
import { describe, test, expect, mock } from 'bun:test';
import React from 'react';
import { renderWithProviders, screen } from '../../test-utils';
import { Button } from '../../../components/ui/Button';
import { Home } from 'lucide-react';
import userEvent from '@testing-library/user-event';

describe('Button Component', () => {
  test('renders with default props (primary variant, md size)', () => {
    renderWithProviders(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  test('renders primary variant', () => {
    renderWithProviders(<Button variant="primary">Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  test('renders secondary variant', () => {
    renderWithProviders(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-secondary');
  });

  test('renders outline variant', () => {
    renderWithProviders(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-outline');
  });

  test('renders ghost variant', () => {
    renderWithProviders(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-ghost');
  });

  test('renders small size with correct classes', () => {
    renderWithProviders(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-3');
    expect(button).toHaveClass('py-1.5');
    expect(button).toHaveClass('text-sm');
  });

  test('renders medium size with correct classes', () => {
    renderWithProviders(<Button size="md">Medium</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  test('renders large size with correct classes', () => {
    renderWithProviders(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('text-lg');
  });

  test('loading state disables button', () => {
    renderWithProviders(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('loading state displays spinner element', () => {
    renderWithProviders(<Button loading>Loading</Button>);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });

  test('loading state still displays children text', () => {
    renderWithProviders(<Button loading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Submit');
  });

  test('disabled state prevents button interaction', () => {
    renderWithProviders(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('disabled state applies disabled styling', () => {
    renderWithProviders(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('opacity-70');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  test('icon renders on left side by default', () => {
    const { container } = renderWithProviders(
      <Button icon={Home}>Home</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Icon should be rendered (SVG element from lucide-react)
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('icon renders on right side when iconPosition is right', () => {
    const { container } = renderWithProviders(
      <Button icon={Home} iconPosition="right">Home</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('fullWidth prop applies w-full class', () => {
    renderWithProviders(<Button fullWidth>Full Width</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });

  test('onClick handler is called when button is clicked', async () => {
    const onClick = mock(() => {});
    renderWithProviders(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('onClick handler receives click event', async () => {
    let capturedEvent: React.MouseEvent<HTMLButtonElement> | null = null;
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      capturedEvent = e;
    };
    renderWithProviders(<Button onClick={onClick}>Click me</Button>);
    const button = screen.getByRole('button');
    
    await userEvent.click(button);
    expect(capturedEvent).toBeTruthy();
  });

  test('click is prevented when loading', async () => {
    const onClick = mock(() => {});
    renderWithProviders(
      <Button loading onClick={onClick}>Loading</Button>
    );
    const button = screen.getByRole('button');
    
    // Button should be disabled when loading
    expect(button).toBeDisabled();
    await userEvent.click(button);
    // onClick should not be called because button is disabled
    expect(onClick).not.toHaveBeenCalled();
  });

  test('click is prevented when disabled', async () => {
    const onClick = mock(() => {});
    renderWithProviders(
      <Button disabled onClick={onClick}>Disabled</Button>
    );
    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  test('combines multiple props correctly', () => {
    renderWithProviders(
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        icon={Home}
      >
        Secondary Large Full Width
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
    expect(button).toHaveClass('text-lg');
    expect(button).toHaveClass('w-full');
  });

  test('accepts standard HTML button attributes', () => {
    renderWithProviders(
      <Button
        title="Tooltip text"
        data-testid="custom-button"
        aria-label="Custom button"
      >
        Button
      </Button>
    );
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('title', 'Tooltip text');
    expect(button).toHaveAttribute('aria-label', 'Custom button');
  });

  test('renders children without icon', () => {
    renderWithProviders(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Click me');
  });

  test('does not render icon when icon prop is not provided', () => {
    const { container } = renderWithProviders(
      <Button>No icon</Button>
    );
    // Should have no SVG elements (no icon)
    expect(container.querySelectorAll('svg')).toHaveLength(0);
  });

  test('handles custom className prop', () => {
    renderWithProviders(
      <Button className="custom-class">Custom</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
