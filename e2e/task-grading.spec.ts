import { test, expect } from './fixtures';
import { loginAs } from './fixtures';

test.describe('Task Grading', () => {
  test('Mentor can grade a task', async ({ page }) => {
    // Given: User is logged in as mentor
    await loginAs(page, 'mentor');

    // When: User navigates to /mentor/tasks
    await page.goto('/mentor/tasks');
    await page.waitForLoadState('networkidle');

    // And: User clicks the eye icon on first mentee row
    const eyeButton = page.locator('button').filter({ has: page.locator('svg') }).first();
    await eyeButton.click();

    // Then: Grading modal opens with grade input
    const gradeInput = page.locator('input[placeholder="0-100"]');
    await gradeInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // When: User enters grade "85" in input field
    await gradeInput.fill('85');

    // And: User clicks "SET GRADE" button
    await page.click('button:has-text("SET GRADE")');

    // Then: Modal closes (grade input disappears)
    await gradeInput.waitFor({ state: 'hidden', timeout: 5000 });

    // And: Mentee row shows "GRADE: 85" badge
    await expect(page.locator('text=GRADE: 85').first()).toBeVisible();
  });
});
