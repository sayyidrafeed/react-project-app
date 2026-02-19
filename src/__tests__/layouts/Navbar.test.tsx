// @ts-ignore - Bun test types not available in tsc
import { describe, test, expect, beforeEach, mock } from 'bun:test';
import Navbar from '../../layouts/components/Navbar';
import { renderWithProviders, screen } from '../test-utils';

describe('Navbar Component', () => {
  beforeEach(() => {
    mock.restore();
  });

  test('should render SIERA brand', () => {
    renderWithProviders(<Navbar />);

    const brand = screen.getByText('SIERA');
    expect(brand).toBeTruthy();
  });

  test('should render PATRIBERA badge', () => {
    renderWithProviders(<Navbar />);

    const badge = screen.getByText('PATRIBERA');
    expect(badge).toBeTruthy();
  });

  test('should render navigation links', () => {
    renderWithProviders(<Navbar />);

    expect(screen.getByText('Beranda')).toBeTruthy();
    expect(screen.getByText('Jadwal')).toBeTruthy();
    expect(screen.getByText('Tentang')).toBeTruthy();
  });

  test('should render login button', () => {
    renderWithProviders(<Navbar />);

    const loginButton = screen.getByText('Masuk Portal');
    expect(loginButton).toBeTruthy();
  });
});
