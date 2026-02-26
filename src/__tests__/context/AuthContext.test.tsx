// @ts-ignore - Bun test types not available in tsc
import { describe, test, expect, beforeEach } from 'bun:test';
import { renderWithProviders, screen, waitFor, render } from '../test-utils';
import { useAuth, AuthContextType } from '../../context/AuthContext';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // ===== INITIAL STATE TESTS =====

  test('after mount, isLoading becomes false', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return <div>{authState.isLoading ? 'Loading' : 'Loaded'}</div>;
    };

    renderWithProviders(<TestComponent />);

    // After mount effect runs, isLoading should be false
    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });
  });

  test('initial state has user null when no localStorage', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return <div>{authState.user?.name || 'No user'}</div>;
    };

    renderWithProviders(<TestComponent />);

    // After mount, user should be null
    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
      expect(authState.user).toBe(null);
      expect(authState.isAuthenticated).toBe(false);
    });
  });

  // ===== LOGIN TESTS =====

  test('login sets user with correct role and properties', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <button onClick={() => authState.login('test@example.com', 'admin')}>
          {authState.isLoading ? 'Logging in...' : 'Login'}
        </button>
      );
    };

    renderWithProviders(<TestComponent />);

    // Wait for initial load to complete
    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    const button = screen.getByRole('button');
    button.click();

    // Wait for login to complete
    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
      expect(authState.user).not.toBe(null);
    });

    expect(authState.user?.email).toBe('test@example.com');
    expect(authState.user?.role).toBe('admin');
    expect(authState.user?.name).toBe('test');
    expect(authState.user?.id).toBeDefined();
  });

  test('login persists user to localStorage', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <button onClick={() => authState.login('panitia@example.com', 'panitia')}>
          Login
        </button>
      );
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    const button = screen.getByRole('button');
    button.click();

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
      const storedUser = localStorage.getItem('siera_user');
      expect(storedUser).not.toBe(null);
    });

    const storedUser = localStorage.getItem('siera_user');
    const parsed = JSON.parse(storedUser!);
    expect(parsed.email).toBe('panitia@example.com');
    expect(parsed.role).toBe('panitia');
  });

  test('login sets mentee-specific fields when role is mentee', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <button onClick={() => authState.login('mentee@example.com', 'mentee')}>
          Login
        </button>
      );
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    const button = screen.getByRole('button');
    button.click();

    await waitFor(() => {
      expect(authState.user?.nim).toBe('2010123456');
      expect(authState.user?.major).toBe('Informatika');
      expect(authState.user?.faculty).toBe('Teknik');
    });
  });

  test('login does not set mentee-specific fields when role is admin', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <button onClick={() => authState.login('admin@example.com', 'admin')}>
          Login
        </button>
      );
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    const button = screen.getByRole('button');
    button.click();

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    expect(authState.user?.nim).toBeUndefined();
    expect(authState.user?.major).toBeUndefined();
    expect(authState.user?.faculty).toBeUndefined();
  });

  // ===== LOGOUT TESTS =====

  test('logout clears user state', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <div>
          <button onClick={() => authState.login('test@example.com', 'admin')}>
            Login
          </button>
          <button onClick={() => authState.logout()}>Logout</button>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    const [loginBtn, logoutBtn] = screen.getAllByRole('button');

    loginBtn.click();

    await waitFor(() => {
      expect(authState.user).not.toBe(null);
    });

    logoutBtn.click();

    await waitFor(() => {
      expect(authState.user).toBe(null);
    });
  });

  test('logout removes user from localStorage', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <div>
          <button onClick={() => authState.login('test@example.com', 'admin')}>
            Login
          </button>
          <button onClick={() => authState.logout()}>Logout</button>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);

    await waitFor(() => {
      expect(authState.isLoading).toBe(false);
    });

    const [loginBtn, logoutBtn] = screen.getAllByRole('button');

    loginBtn.click();

    await waitFor(() => {
      expect(localStorage.getItem('siera_user')).not.toBe(null);
    });

    logoutBtn.click();

    expect(localStorage.getItem('siera_user')).toBe(null);
  });

  // ===== PERSISTENCE TESTS =====

  test('session restoration from localStorage on mount', async () => {
    // Pre-populate localStorage with a user
    const mockUser = {
      id: 'test-id',
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin' as const,
    };
    localStorage.setItem('siera_user', JSON.stringify(mockUser));

    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return <div>{authState.user?.name || 'No user'}</div>;
    };

    renderWithProviders(<TestComponent />);

    // After mount, user should be restored from localStorage
    await waitFor(() => {
      expect(authState.user).not.toBe(null);
      expect(authState.user?.email).toBe('test@example.com');
      expect(authState.user?.role).toBe('admin');
    });
  });

  test('isAuthenticated reflects user presence', async () => {
    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return (
        <div>
          <button onClick={() => authState.login('test@example.com', 'admin')}>
            Login
          </button>
          <button onClick={() => authState.logout()}>Logout</button>
        </div>
      );
    };

    renderWithProviders(<TestComponent />);

    // Initially not authenticated
    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(false);
    });

    const [loginBtn, logoutBtn] = screen.getAllByRole('button');

    loginBtn.click();

    // After login, authenticated
    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(true);
    });

    logoutBtn.click();

    // After logout, not authenticated
    await waitFor(() => {
      expect(authState.isAuthenticated).toBe(false);
    });
  });

  // ===== ERROR HANDLING TESTS =====

  test('invalid localStorage JSON is handled gracefully', async () => {
    // Pre-populate localStorage with invalid JSON
    localStorage.setItem('siera_user', 'invalid-json-data');

    let authState!: AuthContextType;

    const TestComponent = () => {
      authState = useAuth();
      return <div>{authState.user ? 'User loaded' : 'No user'}</div>;
    };

    renderWithProviders(<TestComponent />);

    // After mount, invalid JSON should be cleared from localStorage
    await waitFor(() => {
      expect(localStorage.getItem('siera_user')).toBe(null);
      expect(authState.user).toBe(null);
    });
  });

  test('useAuth throws error when used outside provider', () => {
    const TestComponent = () => {
      useAuth();
      return <div>Test</div>;
    };

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAuth must be used within an AuthProvider');
  });
});
