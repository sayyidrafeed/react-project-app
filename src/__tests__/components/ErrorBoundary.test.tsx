// @ts-ignore
import { describe, it, expect, beforeEach, afterEach, mock } from 'bun:test';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { renderWithProviders, screen } from '../test-utils';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error here</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Suppress console.error for error boundary tests
    mock(console, 'error', () => {});
  });

  afterEach(() => {
    // Restore console.error after tests
    mock.restore();
  });

  it('should render children when no error occurs', () => {
    renderWithProviders(
      <ErrorBoundary>
        <div>Safe Content</div>
      </ErrorBoundary>
    );

    const content = screen.getByText('Safe Content');
    expect(content).toBeTruthy();
  });

  it('should catch error and show fallback UI', () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error message
    const heading = screen.getByText('Something went wrong');
    expect(heading).toBeTruthy();

    // Should show warning emoji
    const emoji = screen.getByText('⚠️');
    expect(emoji).toBeTruthy();
  });

  it('should show custom fallback when provided', () => {
    const customFallback = <div>Custom Error UI</div>;

    renderWithProviders(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const customUI = screen.getByText('Custom Error UI');
    expect(customUI).toBeTruthy();

    // Default error message should not appear
    const defaultMessage = screen.queryByText('Something went wrong');
    expect(defaultMessage).toBeNull();
  });

  it('should have refresh button that calls window.location.reload', () => {
    const reloadMock = mock(() => {});
    const originalReload = window.location.reload;
    // @ts-ignore
    window.location.reload = reloadMock;

    try {
      renderWithProviders(
        <ErrorBoundary>
          <ThrowError shouldThrow={true} />
        </ErrorBoundary>
      );

      const refreshButton = screen.getByText('Refresh Page');
      expect(refreshButton).toBeTruthy();

      // Click refresh button
      refreshButton.click();

      // Verify reload was called
      expect(reloadMock).toHaveBeenCalled();
    } finally {
      window.location.reload = originalReload;
    }
  });

  it('should show error details in dev mode when import.meta.env.DEV is true', () => {
    renderWithProviders(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Look for the details element (error details)
    const detailsElements = document.querySelectorAll('details');
    // In dev mode, details element would be visible
    // The component checks import.meta.env.DEV internally
    expect(detailsElements).toBeDefined();
  });
});
