// @ts-ignore
import { describe, it, expect } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { Heart } from 'lucide-react';
import { StatsCard } from '../../components/StatsCard';

describe('StatsCard Component', () => {
  // Test: Renders title
  it('should render the title', () => {
    render(
      <StatsCard
        title="Revenue"
        value="$12,345"
        icon={Heart}
      />
    );
    expect(screen.getByText('Revenue')).toBeDefined();
  });

  // Test: Renders value
  it('should render the value', () => {
    render(
      <StatsCard
        title="Users"
        value="1,234"
        icon={Heart}
      />
    );
    expect(screen.getByText('1,234')).toBeDefined();
  });

  // Test: Renders icon
  it('should render the icon component', () => {
    const { container } = render(
      <StatsCard
        title="Stats"
        value="100"
        icon={Heart}
      />
    );
    const iconContainer = container.querySelector('.p-2.rounded-lg');
    expect(iconContainer).toBeDefined();
  });

  // Test: Renders description (optional)
  it('should render description when provided', () => {
    render(
      <StatsCard
        title="Growth"
        value="25%"
        icon={Heart}
        description="Compared to last month"
      />
    );
    expect(screen.getByText('Compared to last month')).toBeDefined();
  });

  // Test: Does not render description when not provided
  it('should not render description when not provided', () => {
    const { container } = render(
      <StatsCard
        title="Growth"
        value="25%"
        icon={Heart}
      />
    );
    const description = container.querySelector('p');
    expect(description).toBeNull();
  });

  // Test: Renders trend with up indicator
  it('should render trend with up arrow when isUp is true', () => {
    render(
      <StatsCard
        title="Performance"
        value="95%"
        icon={Heart}
        trend={{ value: 10, isUp: true }}
      />
    );
    expect(screen.getByText('↑ 10%')).toBeDefined();
  });

  // Test: Renders trend with down indicator
  it('should render trend with down arrow when isUp is false', () => {
    render(
      <StatsCard
        title="Errors"
        value="42"
        icon={Heart}
        trend={{ value: 5, isUp: false }}
      />
    );
    expect(screen.getByText('↓ 5%')).toBeDefined();
  });

  // Test: Does not render trend when not provided
  it('should not render trend when not provided', () => {
    const { container } = render(
      <StatsCard
        title="Stats"
        value="500"
        icon={Heart}
      />
    );
    const trendText = container.querySelector('.font-bold.text-xs');
    expect(trendText).toBeNull();
  });

  // Test: Variant - white (default)
  it('should apply white variant by default', () => {
    const { container } = render(
      <StatsCard
        title="White"
        value="100"
        icon={Heart}
      />
    );
    const card = container.querySelector('.card');
    expect(card?.classList.contains('bg-white')).toBe(true);
    expect(card?.classList.contains('text-slate-900')).toBe(true);
  });

  // Test: Variant - green
  it('should apply green variant', () => {
    const { container } = render(
      <StatsCard
        title="Green"
        value="100"
        icon={Heart}
        variant="green"
      />
    );
    const card = container.querySelector('.card');
    expect(card?.classList.contains('bg-upn-green')).toBe(true);
    expect(card?.classList.contains('text-white')).toBe(true);
  });

  // Test: Variant - gold
  it('should apply gold variant', () => {
    const { container } = render(
      <StatsCard
        title="Gold"
        value="100"
        icon={Heart}
        variant="gold"
      />
    );
    const card = container.querySelector('.card');
    expect(card?.classList.contains('bg-upn-gold')).toBe(true);
    expect(card?.classList.contains('text-upn-green')).toBe(true);
  });

  // Test: Renders as div with card class
  it('should render as a div with card class', () => {
    const { container } = render(
      <StatsCard
        title="Test"
        value="42"
        icon={Heart}
      />
    );
    const card = container.querySelector('.card');
    expect(card).toBeDefined();
    expect(card?.tagName).toBe('DIV');
  });

  // Test: Title is uppercase CSS-styled
  it('should have uppercase CSS styling on title', () => {
    render(
      <StatsCard
        title="lowercase"
        value="100"
        icon={Heart}
      />
    );
    const titleSpan = screen.getByText('lowercase');
    expect(titleSpan?.classList.contains('uppercase')).toBe(true);
  });

  // Test: Numeric value
  it('should render numeric values', () => {
    render(
      <StatsCard
        title="Count"
        value={999}
        icon={Heart}
      />
    );
    expect(screen.getByText('999')).toBeDefined();
  });

  // Test: Combines description and trend
  it('should render both description and trend', () => {
    render(
      <StatsCard
        title="Combined"
        value="150"
        icon={Heart}
        description="Test description"
        trend={{ value: 20, isUp: true }}
      />
    );
    expect(screen.getByText('Test description')).toBeDefined();
    expect(screen.getByText('↑ 20%')).toBeDefined();
  });

  // Test: Card structure
  it('should have correct card structure', () => {
    const { container } = render(
      <StatsCard
        title="Structure"
        value="100"
        icon={Heart}
      />
    );
    const card = container.querySelector('.card');
    expect(card?.classList.contains('relative')).toBe(true);
    expect(card?.classList.contains('overflow-hidden')).toBe(true);
    expect(card?.classList.contains('flex')).toBe(true);
    expect(card?.classList.contains('flex-col')).toBe(true);
  });

  // Test: Icon size and placement
  it('should render icon in correctly positioned container', () => {
    const { container } = render(
      <StatsCard
        title="Icon Position"
        value="42"
        icon={Heart}
      />
    );
    const headerDiv = container.querySelector('.flex.justify-between');
    const iconContainer = headerDiv?.querySelector('.p-2.rounded-lg');
    expect(iconContainer).toBeDefined();
  });
});
