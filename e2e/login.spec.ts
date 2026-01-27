import { test, expect, loginAs } from './fixtures';

/**
 * E2E Test Suite: Login Flow
 * Tests login functionality for all three user roles (mentee, mentor, admin)
 * and verifies correct dashboard rendering after authentication
 */

test.describe('Login Flow', () => {
  test('Mentee can login and see dashboard', async ({ page }) => {
    // Login as mentee
    await loginAs(page, 'mentee');

    // Verify redirect to mentee dashboard
    await expect(page).toHaveURL(/\/mentee/);

    // Verify dashboard shows "PATRIVER!" greeting
    await expect(page.locator('text=PATRIVER!')).toBeVisible();

    // Verify user name appears in header
    await expect(page.locator('text=PATRIVER')).toBeVisible();
  });

  test('Mentor can login and see dashboard', async ({ page }) => {
    // Login as mentor
    await loginAs(page, 'mentor');

    // Verify redirect to mentor dashboard
    await expect(page).toHaveURL(/\/mentor/);

    // Verify dashboard shows "Ringkasan Grup" heading
    await expect(page.locator('text=Ringkasan Grup')).toBeVisible();
  });

  test('Admin can login and see dashboard', async ({ page }) => {
    // Login as admin
    await loginAs(page, 'admin');

    // Verify redirect to admin dashboard
    await expect(page).toHaveURL(/\/admin/);

    // Verify dashboard shows "Admin Oversight" heading
    await expect(page.locator('text=Admin Oversight')).toBeVisible();
  });
});
