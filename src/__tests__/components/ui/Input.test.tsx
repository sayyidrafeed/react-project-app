// @ts-ignore
import { describe, it, expect, beforeEach } from 'bun:test';
import { Input, Select, Textarea } from '../../../components/ui/Input';
import { renderWithProviders, screen } from '../../test-utils';
import { Heart } from 'lucide-react';

describe('Input Component', () => {
  // Input: renders with label
  it('renders with label', () => {
    renderWithProviders(<Input label="Username" />);
    const label = screen.getByText('Username');
    expect(label).toBeDefined();
    expect(label.tagName).toBe('LABEL');
  });

  // Input: renders without label
  it('renders without label', () => {
    renderWithProviders(<Input placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text') as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.id).toBeDefined();
  });

  // Input: error state shows error message with role="alert"
  it('error state shows error message with role="alert"', () => {
    renderWithProviders(<Input label="Email" error="Invalid email" />);
    const alert = screen.getByRole('alert');
    expect(alert).toBeDefined();
    expect(alert.textContent).toBe('Invalid email');
  });

  // Input: hint shows when no error
  it('hint shows when no error', () => {
    renderWithProviders(<Input label="Password" hint="At least 8 characters" />);
    const hint = screen.getByText('At least 8 characters');
    expect(hint).toBeDefined();
  });

  // Input: error takes precedence over hint
  it('error takes precedence over hint', () => {
    renderWithProviders(
      <Input label="Username" error="Required" hint="Enter your name" />
    );
    const error = screen.getByRole('alert');
    expect(error.textContent).toBe('Required');
    
    // Hint should not be present
    const hint = screen.queryByText('Enter your name');
    expect(hint).toBeNull();
  });

  // Input: icon renders on left side
  it('icon renders on left side', () => {
    const { container } = renderWithProviders(
      <Input label="Favorite" icon={Heart} />
    );
    const icon = container.querySelector('svg');
    expect(icon).toBeDefined();
  });

  // Input: test size sm
  it('renders with size sm', () => {
    const { container } = renderWithProviders(<Input label="Small" size="sm" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('px-3');
    expect(input?.className).toContain('py-2');
    expect(input?.className).toContain('text-sm');
  });

  // Input: test size md
  it('renders with size md', () => {
    const { container } = renderWithProviders(<Input label="Medium" size="md" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('px-4');
    expect(input?.className).toContain('py-3');
  });

  // Input: test size lg
  it('renders with size lg', () => {
    const { container } = renderWithProviders(<Input label="Large" size="lg" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('px-5');
    expect(input?.className).toContain('py-4');
    expect(input?.className).toContain('text-lg');
  });

  // Input: aria-invalid is true when error exists
  it('aria-invalid is true when error exists', () => {
    renderWithProviders(<Input label="Field" error="Error message" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  // Input: aria-invalid is false when no error
  it('aria-invalid is false when no error', () => {
    renderWithProviders(<Input label="Field" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  // Input: aria-describedby links to error
  it('aria-describedby links to error element', () => {
    renderWithProviders(<Input label="Email" error="Invalid email" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const describedById = input.getAttribute('aria-describedby');
    expect(describedById).toBeDefined();
    
    const errorElement = document.getElementById(describedById || '');
    expect(errorElement).toBeDefined();
    expect(errorElement?.textContent).toBe('Invalid email');
  });

  // Input: aria-describedby links to hint
  it('aria-describedby links to hint element', () => {
    renderWithProviders(<Input label="Password" hint="Enter strong password" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    const describedById = input.getAttribute('aria-describedby');
    expect(describedById).toBeDefined();
    
    const hintElement = document.getElementById(describedById || '');
    expect(hintElement).toBeDefined();
    expect(hintElement?.textContent).toBe('Enter strong password');
  });

  // Input: generates id from label
  it('generates id from label if not provided', () => {
    renderWithProviders(<Input label="First Name" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.id).toBe('first-name');
  });

  // Input: uses provided id
  it('uses provided id', () => {
    renderWithProviders(<Input label="First Name" id="custom-id" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.id).toBe('custom-id');
  });
});

describe('Select Component', () => {
  // Select: renders with options
  it('renders with options', () => {
    renderWithProviders(
      <Select label="Country">
        <option>USA</option>
        <option>Canada</option>
      </Select>
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select).toBeDefined();
    expect(select.options.length).toBe(2);
  });

  // Select: error state
  it('shows error state', () => {
    renderWithProviders(
      <Select label="Country" error="Please select a country">
        <option>USA</option>
      </Select>
    );
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Please select a country');
  });

  // Select: hint state
  it('shows hint state', () => {
    renderWithProviders(
      <Select label="Country" hint="Select your location">
        <option>USA</option>
      </Select>
    );
    const hint = screen.getByText('Select your location');
    expect(hint).toBeDefined();
  });

  // Select: renders with label
  it('renders with label', () => {
    renderWithProviders(
      <Select label="Preference">
        <option>Option 1</option>
      </Select>
    );
    const label = screen.getByText('Preference');
    expect(label.tagName).toBe('LABEL');
  });

  // Select: aria-invalid is true when error
  it('aria-invalid is true when error exists', () => {
    renderWithProviders(
      <Select label="Status" error="Required">
        <option>Active</option>
      </Select>
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.getAttribute('aria-invalid')).toBe('true');
  });

  // Select: aria-describedby links to error
  it('aria-describedby links to error element', () => {
    renderWithProviders(
      <Select label="Category" error="Please select category">
        <option>Tech</option>
      </Select>
    );
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    const describedById = select.getAttribute('aria-describedby');
    expect(describedById).toBeDefined();
    
    const errorElement = document.getElementById(describedById || '');
    expect(errorElement?.textContent).toBe('Please select category');
  });

  // Select: error takes precedence over hint
  it('error takes precedence over hint', () => {
    renderWithProviders(
      <Select label="Status" error="Required field" hint="Choose one option">
        <option>Option</option>
      </Select>
    );
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Required field');
    
    const hint = screen.queryByText('Choose one option');
    expect(hint).toBeNull();
  });
});

describe('Textarea Component', () => {
  // Textarea: renders with label
  it('renders with label', () => {
    renderWithProviders(<Textarea label="Comments" />);
    const label = screen.getByText('Comments');
    expect(label.tagName).toBe('LABEL');
  });

  // Textarea: error state
  it('shows error state', () => {
    renderWithProviders(<Textarea label="Feedback" error="Maximum 500 characters" />);
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Maximum 500 characters');
  });

  // Textarea: resize-none class applied
  it('has resize-none class', () => {
    const { container } = renderWithProviders(<Textarea label="Message" />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toContain('resize-none');
  });

  // Textarea: aria-invalid is true when error
  it('aria-invalid is true when error exists', () => {
    renderWithProviders(<Textarea label="Message" error="Error" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
  });

  // Textarea: aria-describedby links to error
  it('aria-describedby links to error element', () => {
    renderWithProviders(<Textarea label="Description" error="Too long" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    const describedById = textarea.getAttribute('aria-describedby');
    expect(describedById).toBeDefined();
    
    const errorElement = document.getElementById(describedById || '');
    expect(errorElement?.textContent).toBe('Too long');
  });

  // Textarea: hint shows when no error
  it('shows hint when no error', () => {
    renderWithProviders(
      <Textarea label="Notes" hint="Be descriptive" />
    );
    const hint = screen.getByText('Be descriptive');
    expect(hint).toBeDefined();
  });

  // Textarea: test all sizes
  it('renders with size sm', () => {
    const { container } = renderWithProviders(<Textarea label="Small" size="sm" />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toContain('px-3');
    expect(textarea?.className).toContain('py-2');
    expect(textarea?.className).toContain('text-sm');
  });

  it('renders with size md', () => {
    const { container } = renderWithProviders(<Textarea label="Medium" size="md" />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toContain('px-4');
    expect(textarea?.className).toContain('py-3');
  });

  it('renders with size lg', () => {
    const { container } = renderWithProviders(<Textarea label="Large" size="lg" />);
    const textarea = container.querySelector('textarea');
    expect(textarea?.className).toContain('px-5');
    expect(textarea?.className).toContain('py-4');
    expect(textarea?.className).toContain('text-lg');
  });

  // Textarea: error takes precedence over hint
  it('error takes precedence over hint', () => {
    renderWithProviders(
      <Textarea label="Message" error="Required" hint="Describe your issue" />
    );
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Required');
    
    const hint = screen.queryByText('Describe your issue');
    expect(hint).toBeNull();
  });

  // Textarea: generates id from label
  it('generates id from label if not provided', () => {
    renderWithProviders(<Textarea label="Your Feedback" />);
    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.id).toBe('your-feedback');
  });
});
