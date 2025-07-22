import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Navigate to the sign-in page
  await page.goto('/sign-in');
  
  // For demo purposes, we'll skip actual OAuth and go directly to dashboard
  // In a real scenario, you'd handle the OAuth flow here
  
  // Option 1: Mock authentication by setting cookies/localStorage
  await page.evaluate(() => {
    // Set a mock session in localStorage (adjust based on your auth implementation)
    localStorage.setItem('auth-token', 'mock-token');
  });
  
  // Option 2: Navigate directly to dashboard (simulating authenticated state)
  await page.goto('/dashboard');
  
  // Wait for the dashboard to load, indicating successful authentication
  await expect(page.locator('text=Dashboard')).toBeVisible({ timeout: 10000 });
  
  // Save authentication state
  await page.context().storageState({ path: authFile });
});

export { authFile }; 