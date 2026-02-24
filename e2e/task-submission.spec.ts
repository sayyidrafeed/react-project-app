import { test, expect } from './fixtures';

test.describe('Task Submission Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage and set up mentee user with task data that includes graded tasks
    await page.goto('http://localhost:5173');
    await page.evaluate(() => {
      localStorage.clear();
      
      // Set up user
      localStorage.setItem('siera_user', JSON.stringify({
        id: 'M001',
        name: 'Test Mentee',
        email: 'test@example.com',
        role: 'mentee',
        class: 'Test Class',
        belaNegaraScore: 85
      }));
      
      // Set up tasks with mixed grades (some pending, some graded)
      localStorage.setItem('siera_tasks', JSON.stringify([
        {
          id: 't1',
          title: 'Resume PKKMB Day 1',
          description: 'Upload resume kegiatan hari pertama dalam format PDF.',
          deadline: '2026-08-15',
          type: 'individual',
          grade: null, // Pending task
          createdAt: '2026-08-10T00:00:00Z'
        },
        {
          id: 't2',
          title: 'Yel-yel Kelompok',
          description: 'Video yel-yel kelompok durasi minimal 1 menit.',
          deadline: '2026-08-17',
          type: 'group',
          grade: 85, // Graded task
          gradedAt: '2026-08-16T00:00:00Z',
          submittedAt: '2026-08-15T00:00:00Z',
          createdAt: '2026-08-10T00:00:00Z'
        },
        {
          id: 't3',
          title: 'Esai Bela Negara',
          description: 'Tulis esai 500 kata tentang konsep Bela Negara.',
          deadline: '2026-08-20',
          type: 'individual',
          grade: 90, // Graded task
          gradedAt: '2026-08-19T00:00:00Z',
          submittedAt: '2026-08-18T00:00:00Z',
          createdAt: '2026-08-10T00:00:00Z'
        }
      ]));
    });
  });

  test('Mentee can submit a task', async ({ page }) => {
    // Navigate to tasks page (already logged in via localStorage)
    await page.goto('http://localhost:5173/mentee/tasks');
    
    // Wait for tasks to load
    await page.waitForSelector('button:has-text("KIRIM SEKARANG")');

    // Click "KIRIM SEKARANG" on first pending task
    await page.click('button:has-text("KIRIM SEKARANG")');

    // Upload modal appears
    await page.waitForSelector('h2:has-text("Kirim Tugas")');

    // Click "KONFIRMASI PENGIRIMAN"
    await page.click('button:has-text("KONFIRMASI PENGIRIMAN")');

    // Wait for progress to start and complete (upload simulation takes ~1.5s = 150ms * 10 steps)
    await page.waitForTimeout(2000);

    // Modal closes after upload completes
    await page.waitForSelector('h2:has-text("Kirim Tugas")', { state: 'hidden', timeout: 1000 });

    // Task card shows "TERTUNDA" status (grade is null until graded)
    const pendingBadge = page.locator('text=TERTUNDA').first();
    await expect(pendingBadge).toBeVisible();
  });

  test('Task filter works', async ({ page }) => {
    // Navigate to tasks page (already logged in via localStorage)
    await page.goto('http://localhost:5173/mentee/tasks');
    
    // Wait for page to load
    await page.waitForSelector('button:has-text("semua")');

    // Initially on "all" filter - should see both pending and graded tasks
    const allTasks = page.locator('.card');
    await expect(allTasks).toHaveCount(3); // 1 pending + 2 graded

    // Click "tertunda" filter
    await page.click('button:has-text("tertunda")');
    await page.waitForTimeout(300);

    // Only pending tasks are shown (verify TERTUNDA badge exists)
    const pendingBadges = page.locator('text=TERTUNDA');
    await expect(pendingBadges.first()).toBeVisible();

    // Verify no graded badges are shown (mock data has graded tasks with grades 85 and 90)
    const grade85Badge = page.locator('text=NILAI: 85');
    await expect(grade85Badge).toHaveCount(0);

    // Click "dinilai" filter
    await page.click('button:has-text("dinilai")');
    await page.waitForTimeout(300);

    // Only graded tasks are shown - should see 2 graded task cards
    const taskCards = page.locator('.card');
    const visibleCards = await taskCards.count();
    expect(visibleCards).toBe(2); // Only 2 graded tasks should be visible

    // Verify NILAI badges exist for graded tasks
    const grade85 = page.locator('text=NILAI: 85').first();
    await expect(grade85).toBeVisible();
    
    const grade90 = page.locator('text=NILAI: 90').first();
    await expect(grade90).toBeVisible();
  });
});
