import { test as base, expect as baseExpect, Page } from '@playwright/test';

export const test = base;
export const expect = baseExpect;

/**
 * Helper function to login as a specific role
 * @param page - Playwright Page object
 * @param role - User role: 'mentee', 'mentor', or 'admin'
 */
export async function loginAs(page: Page, role: 'mentee' | 'mentor' | 'admin') {
  // Navigate to login page (localStorage already cleared by beforeEach)
  await page.goto('http://localhost:5173/login');
  
  // Wait for page to be fully loaded
  await page.waitForLoadState('domcontentloaded');
  
  // Click the role button (buttons render as uppercase in UI)
  const roleButtonMap = {
    mentee: 'MENTEE',
    mentor: 'MENTOR',
    admin: 'ADMIN',
  };
  
  await page.click(`button:has-text("${roleButtonMap[role]}")`);
  
  // Fill in email and password (required fields)
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password123');
  
  // Click the login button
  await page.click('button:has-text("Masuk ke SIERA")');
  
  // Wait for navigation to complete
  await page.waitForURL(`**/${role}`, { timeout: 10000 });
}
