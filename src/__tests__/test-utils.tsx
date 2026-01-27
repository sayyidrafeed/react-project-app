import React, { ReactElement } from 'react';
import { render, RenderOptions, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';

/**
 * AllProviders wrapper for tests
 * Wraps components with AuthProvider + MemoryRouter
 */
interface AllProvidersProps {
  children: React.ReactNode;
  initialEntries?: string[];
}

export const AllProviders: React.FC<AllProvidersProps> = ({ 
  children, 
  initialEntries = ['/'] 
}) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </MemoryRouter>
  );
};

/**
 * Custom render function that wraps components with providers
 * Includes automatic cleanup to prevent DOM pollution between tests
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: ReactElement,
  { initialEntries = ['/'], ...renderOptions }: CustomRenderOptions = {}
) {
  // Clean up any previous renders to prevent DOM pollution
  cleanup();
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders initialEntries={initialEntries}>
        {children}
      </AllProviders>
    ),
    ...renderOptions,
  });
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
