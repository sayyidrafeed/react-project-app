// @ts-ignore - Bun test types not available in tsc
import { describe, test, expect, beforeEach, mock } from 'bun:test';
import Sidebar from '../../layouts/components/Sidebar';
import { renderWithProviders, screen } from '../test-utils';

describe('Sidebar Component', () => {
  const defaultProps = {
    userRole: 'mentee' as const,
    isCollapsed: false,
    setIsCollapsed: mock(() => {}),
    onLogout: mock(() => {}),
  };

  beforeEach(() => {
    mock.restore();
  });

  test('should render SIERA brand', () => {
    renderWithProviders(<Sidebar {...defaultProps} />);

    const brand = screen.getByText('SIERA');
    expect(brand).toBeTruthy();
  });

  test('should render mentee menu items', () => {
    renderWithProviders(<Sidebar {...defaultProps} userRole="mentee" />);

    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Discover')).toBeTruthy();
    expect(screen.getByText('Presensi')).toBeTruthy();
    expect(screen.getByText('Tasks')).toBeTruthy();
    expect(screen.getByText('Profile')).toBeTruthy();
  });

  test('should render admin menu items', () => {
    renderWithProviders(<Sidebar {...defaultProps} userRole="admin" />);

    expect(screen.getByText('Ringkasan')).toBeTruthy();
    expect(screen.getByText('Manajemen User')).toBeTruthy();
    expect(screen.getByText('Manajemen Event')).toBeTruthy();
  });

  test('should render panitia menu items', () => {
    renderWithProviders(<Sidebar {...defaultProps} userRole="panitia" />);

    expect(screen.getByText('Statistik Grup')).toBeTruthy();
    expect(screen.getByText('Daftar Mentee')).toBeTruthy();
    expect(screen.getByText('Validasi Tugas')).toBeTruthy();
  });

  test('should render logout button', () => {
    renderWithProviders(<Sidebar {...defaultProps} />);

    const logoutButton = screen.getByText('Keluar Sesi');
    expect(logoutButton).toBeTruthy();
  });

  test('should call onLogout when logout is clicked', () => {
    const onLogout = mock(() => {});
    renderWithProviders(<Sidebar {...defaultProps} onLogout={onLogout} />);

    const logoutButton = screen.getByText('Keluar Sesi');
    logoutButton.click();

    expect(onLogout).toHaveBeenCalled();
  });

  test('should hide menu text when collapsed', () => {
    renderWithProviders(<Sidebar {...defaultProps} isCollapsed={true} />);

    const menuTexts = screen.queryAllByText('Home');
    expect(menuTexts.length).toBe(0);
  });

  test('should show menu text when not collapsed', () => {
    renderWithProviders(<Sidebar {...defaultProps} isCollapsed={false} />);

    expect(screen.getByText('Home')).toBeTruthy();
  });
});
