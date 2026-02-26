import { test, expect } from './fixtures';
import { loginAs } from './fixtures';

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 900 },
];

for (const viewport of viewports) {
  test(`panitia task validation renders grade status on ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await loginAs(page, 'panitia');

    await page.goto('/panitia/tasks');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('span:visible', { hasText: 'NILAI: 85' }).first()).toBeVisible();

    const detailButton = page.locator('button[aria-label^="Lihat detail"]:visible').first();
    await expect(detailButton).toBeVisible();
    await detailButton.click();

    const gradeInput = page.locator('input[placeholder="0-100"]');
    await expect(gradeInput).toBeVisible();
    await gradeInput.fill('85');

    await page.click('button:has-text("SIMPAN NILAI")');
    await expect(gradeInput).toBeHidden();
    await expect(page.locator('span:visible', { hasText: 'NILAI: 85' }).first()).toBeVisible();
  });
}

test('panitia mobile bottom nav points to newest panitia pages', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await loginAs(page, 'panitia');
  await page.goto('/panitia/tasks');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('a[href="/panitia/statistik-grup"]:visible')).toHaveCount(1);
  await expect(page.locator('a[href="/panitia/group"]:visible')).toHaveCount(1);
  await expect(page.locator('a[href="/panitia/tasks"]:visible')).toHaveCount(1);
});
