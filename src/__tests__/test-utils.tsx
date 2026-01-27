import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
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
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
}

export function renderWithProviders(
  ui: ReactElement,
  { initialEntries = ['/'], ...renderOptions }: CustomRenderOptions = {}
) {
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
