// @ts-ignore
import { describe, it, expect } from 'bun:test';
import { renderWithProviders } from '../../test-utils';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/Card';

describe('Card Component', () => {
  it('should render children', () => {
    const { getByText } = renderWithProviders(
      <Card>
        <p>Test content</p>
      </Card>
    );

    expect(getByText('Test content')).toBeTruthy();
  });

  it('should apply default variant class', () => {
    const { container } = renderWithProviders(
      <Card>
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('card');
  });

  it('should apply elevated variant class', () => {
    const { container } = renderWithProviders(
      <Card variant="elevated">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('card-elevated');
  });

  it('should apply outlined variant class', () => {
    const { container } = renderWithProviders(
      <Card variant="outlined">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('card-outlined');
  });

  it('should apply default padding (md)', () => {
    const { container } = renderWithProviders(
      <Card>
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('p-6');
  });

  it('should apply small padding', () => {
    const { container } = renderWithProviders(
      <Card padding="sm">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('p-4');
  });

  it('should apply large padding', () => {
    const { container } = renderWithProviders(
      <Card padding="lg">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('p-8');
  });

  it('should apply no padding', () => {
    const { container } = renderWithProviders(
      <Card padding="none">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('p-0');
  });

  it('should not apply hover classes when hoverable is false', () => {
    const { container } = renderWithProviders(
      <Card hoverable={false}>
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).not.toContain('hover:shadow-xl');
    expect(cardDiv?.className).not.toContain('cursor-pointer');
  });

  it('should apply hover classes when hoverable is true', () => {
    const { container } = renderWithProviders(
      <Card hoverable={true}>
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('hover:shadow-xl');
    expect(cardDiv?.className).toContain('cursor-pointer');
    expect(cardDiv?.className).toContain('hover:-translate-y-1');
  });

  it('should apply custom className', () => {
    const { container } = renderWithProviders(
      <Card className="custom-class">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('custom-class');
  });

  it('should combine all props correctly', () => {
    const { container } = renderWithProviders(
      <Card variant="elevated" padding="lg" hoverable={true} className="test-class">
        <p>Content</p>
      </Card>
    );

    const cardDiv = container.querySelector('div');
    expect(cardDiv?.className).toContain('card-elevated');
    expect(cardDiv?.className).toContain('p-8');
    expect(cardDiv?.className).toContain('cursor-pointer');
    expect(cardDiv?.className).toContain('hover:shadow-xl');
    expect(cardDiv?.className).toContain('test-class');
  });
});

describe('CardHeader Component', () => {
  it('should render title', () => {
    const { getByText } = renderWithProviders(
      <CardHeader title="Test Title" />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('should render title with correct styling', () => {
    const { container } = renderWithProviders(
      <CardHeader title="Test Title" />
    );

    const titleElement = container.querySelector('h3');
    expect(titleElement?.textContent).toBe('Test Title');
    expect(titleElement?.className).toContain('text-h3');
    expect(titleElement?.className).toContain('font-extrabold');
    expect(titleElement?.className).toContain('text-upn-green');
  });

  it('should render subtitle when provided', () => {
    const { getByText } = renderWithProviders(
      <CardHeader title="Title" subtitle="Test Subtitle" />
    );

    expect(getByText('Test Subtitle')).toBeTruthy();
  });

  it('should apply subtitle styling', () => {
    const { container } = renderWithProviders(
      <CardHeader title="Title" subtitle="Test Subtitle" />
    );

    const subtitleElement = container.querySelector('p');
    expect(subtitleElement?.textContent).toBe('Test Subtitle');
    expect(subtitleElement?.className).toContain('text-body-sm');
    expect(subtitleElement?.className).toContain('text-slate-600');
  });

  it('should not render subtitle when not provided', () => {
    const { container } = renderWithProviders(
      <CardHeader title="Title" />
    );

    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBe(0);
  });

  it('should render action slot when provided', () => {
    const { getByText } = renderWithProviders(
      <CardHeader title="Title" action={<button>Action</button>} />
    );

    expect(getByText('Action')).toBeTruthy();
  });

  it('should not render action slot when not provided', () => {
    const { container } = renderWithProviders(
      <CardHeader title="Title" />
    );

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(0);
  });

  it('should apply flexbox layout with justify-between', () => {
    const { container } = renderWithProviders(
      <CardHeader title="Title" action={<span>Action</span>} />
    );

    const headerDiv = container.querySelector('div');
    expect(headerDiv?.className).toContain('flex');
    expect(headerDiv?.className).toContain('justify-between');
  });

  it('should apply custom className', () => {
    const { container } = renderWithProviders(
      <CardHeader title="Title" className="custom-class" />
    );

    const headerDiv = container.querySelector('div');
    expect(headerDiv?.className).toContain('custom-class');
  });
});

describe('CardContent Component', () => {
  it('should render children', () => {
    const { getByText } = renderWithProviders(
      <CardContent>
        <p>Content text</p>
      </CardContent>
    );

    expect(getByText('Content text')).toBeTruthy();
  });

  it('should apply space-y-4 class', () => {
    const { container } = renderWithProviders(
      <CardContent>
        <p>Content</p>
      </CardContent>
    );

    const contentDiv = container.querySelector('div');
    expect(contentDiv?.className).toContain('space-y-4');
  });

  it('should render multiple children', () => {
    const { getByText } = renderWithProviders(
      <CardContent>
        <p>First</p>
        <p>Second</p>
        <p>Third</p>
      </CardContent>
    );

    expect(getByText('First')).toBeTruthy();
    expect(getByText('Second')).toBeTruthy();
    expect(getByText('Third')).toBeTruthy();
  });

  it('should apply custom className', () => {
    const { container } = renderWithProviders(
      <CardContent className="custom-class">
        <p>Content</p>
      </CardContent>
    );

    const contentDiv = container.querySelector('div');
    expect(contentDiv?.className).toContain('custom-class');
    expect(contentDiv?.className).toContain('space-y-4');
  });
});

describe('CardFooter Component', () => {
  it('should render children', () => {
    const { getByText } = renderWithProviders(
      <CardFooter>
        <button>Button</button>
      </CardFooter>
    );

    expect(getByText('Button')).toBeTruthy();
  });

  it('should apply default alignment (right)', () => {
    const { container } = renderWithProviders(
      <CardFooter>
        <button>Button</button>
      </CardFooter>
    );

    const footerDiv = container.querySelector('div');
    expect(footerDiv?.className).toContain('justify-end');
  });

  it('should apply left alignment', () => {
    const { container } = renderWithProviders(
      <CardFooter align="left">
        <button>Button</button>
      </CardFooter>
    );

    const footerDiv = container.querySelector('div');
    expect(footerDiv?.className).toContain('justify-start');
  });

  it('should apply center alignment', () => {
    const { container } = renderWithProviders(
      <CardFooter align="center">
        <button>Button</button>
      </CardFooter>
    );

    const footerDiv = container.querySelector('div');
    expect(footerDiv?.className).toContain('justify-center');
  });

  it('should apply between alignment', () => {
    const { container } = renderWithProviders(
      <CardFooter align="between">
        <button>Button</button>
      </CardFooter>
    );

    const footerDiv = container.querySelector('div');
    expect(footerDiv?.className).toContain('justify-between');
  });

  it('should apply footer styling (flex, gap, border, spacing)', () => {
    const { container } = renderWithProviders(
      <CardFooter>
        <button>Button</button>
      </CardFooter>
    );

    const footerDiv = container.querySelector('div');
    expect(footerDiv?.className).toContain('flex');
    expect(footerDiv?.className).toContain('gap-2');
    expect(footerDiv?.className).toContain('mt-6');
    expect(footerDiv?.className).toContain('pt-4');
    expect(footerDiv?.className).toContain('border-t');
  });

  it('should render multiple children', () => {
    const { getByText } = renderWithProviders(
      <CardFooter>
        <button>Cancel</button>
        <button>Submit</button>
      </CardFooter>
    );

    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('should apply custom className', () => {
    const { container } = renderWithProviders(
      <CardFooter className="custom-class">
        <button>Button</button>
      </CardFooter>
    );

    const footerDiv = container.querySelector('div');
    expect(footerDiv?.className).toContain('custom-class');
  });
});
