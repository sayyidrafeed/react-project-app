import { test, expect, loginAs } from './fixtures';

/**
 * E2E Test Suite: Route Protection
 * 
 * Tests authentication guards and session persistence across the application.
 * Covers:
 * - Unauthenticated access redirects to login
 * - Wrong role access redirects to user's dashboard
 * - Session persistence across page refresh
 */

test.describe('Route Protection', () => {
  // Clear localStorage before each test to ensure clean state
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.evaluate(() => localStorage.clear());
  });

  test('Unauthenticated user redirected to login', async ({ page }) => {
    // Given: User is not logged in
    await page.goto('http://localhost:5173/mentee');
    
    // Then: User is redirected to /login
    await page.waitForURL('**/login');
    expect(page.url()).toContain('/login');
  });

  test('Wrong role redirected to own dashboard', async ({ page }) => {
    // Given: User is logged in as mentee
    await loginAs(page, 'mentee');
    
    // Verify user is on mentee dashboard
    await expect(page).toHaveURL(/\/mentee/);
    
    // When: User navigates to /admin (unauthorized role)
    await page.goto('http://localhost:5173/admin');
    
    // Then: User is redirected to /mentee (their own dashboard)
    await page.waitForURL('**/mentee');
    expect(page.url()).toContain('/mentee');
    expect(page.url()).not.toContain('/admin');
  });

  test('Session persists across page refresh', async ({ page }) => {
    // Given: User is logged in as mentor
    await loginAs(page, 'mentor');
    
    // Verify user is on mentor dashboard
    await expect(page).toHaveURL(/\/mentor/);
    
    // Wait for dashboard content to load
    await page.waitForSelector('text=/Dashboard|Mentor|Group/i', { timeout: 5000 });
    
    // When: User refreshes the page
    await page.reload();
    
    // Then: User remains on /mentor dashboard
    await expect(page).toHaveURL(/\/mentor/);
    expect(page.url()).toContain('/mentor');
    
    // And: Dashboard content is still displayed (session restored)
    await expect(page.locator('text=/Dashboard|Mentor|Group/i').first()).toBeVisible();
  });
});
