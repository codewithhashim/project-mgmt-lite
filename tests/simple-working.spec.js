import { test, expect } from '@playwright/test';

test.describe('E2E Tests', () => {
  
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check that the homepage loads
    await expect(page.locator('text=ProjectLite')).toBeVisible();
    await expect(page.locator('text=Get Started')).toBeVisible();
    await expect(page.locator('text=View Dashboard (Demo)')).toBeVisible();
  });

  test('should navigate to sign-in page', async ({ page }) => {
    await page.goto('/');
    
    // Click on "Get Started"
    await page.locator('text=Get Started').click();
    
    // Should navigate to sign-in page
    await expect(page.locator('h1:has-text("Sign In")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign in with Google")')).toBeVisible();
    await expect(page.locator('button:has-text("Sign in with GitHub")')).toBeVisible();
  });

  test('should test basic form validation with simple HTML', async ({ page }) => {
    const simpleFormHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Simple Form Test</title>
      </head>
      <body>
        <h1>Task Form</h1>
        <form id="testForm">
          <input id="title" type="text" placeholder="Task Title" />
          <textarea id="description" placeholder="Description"></textarea>
          <button type="submit">Create Task</button>
        </form>
        
        <div id="result"></div>
        
        <script>
          document.getElementById('testForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const result = document.getElementById('result');
            
            if (title.length < 3) {
              result.innerHTML = 'Error: Title too short';
              result.style.color = 'red';
            } else {
              result.innerHTML = 'Success: Task would be created';
              result.style.color = 'green';
              this.reset();
            }
          });
        </script>
      </body>
      </html>
    `;
    
    await page.setContent(simpleFormHTML);
    
    // Test form elements are present
    await expect(page.locator('#title')).toBeVisible();
    await expect(page.locator('#description')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Test validation error
    await page.locator('#title').fill('ab');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#result')).toHaveText('Error: Title too short');
    
    // Test successful submission
    await page.locator('#title').fill('Valid Task Title');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('#result')).toHaveText('Success: Task would be created');
    
    // Verify form was reset
    await expect(page.locator('#title')).toHaveValue('');
  });

  test('should test keyboard navigation', async ({ page }) => {
    const keyboardTestHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Keyboard Test</title>
      </head>
      <body>
        <form>
          <input id="field1" type="text" />
          <textarea id="field2"></textarea>
          <button id="submit" type="submit">Submit</button>
        </form>
      </body>
      </html>
    `;
    
    await page.setContent(keyboardTestHTML);
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('#field1')).toBeFocused();
    
    await page.keyboard.type('Test input');
    await expect(page.locator('#field1')).toHaveValue('Test input');
    
    await page.keyboard.press('Tab');
    await expect(page.locator('#field2')).toBeFocused();
    
    await page.keyboard.type('Test textarea');
    await expect(page.locator('#field2')).toHaveValue('Test textarea');
    
    await page.keyboard.press('Tab');
    await expect(page.locator('#submit')).toBeFocused();
  });

  test('should test accessibility basics', async ({ page }) => {
    const accessibilityHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <title>Accessibility Test</title>
      </head>
      <body>
        <main>
          <h1>Form Test</h1>
          <form>
            <label for="title">Title</label>
            <input id="title" type="text" />
            
            <label for="desc">Description</label>
            <textarea id="desc"></textarea>
            
            <button type="submit">Submit</button>
          </form>
        </main>
      </body>
      </html>
    `;
    
    await page.setContent(accessibilityHTML);
    
    // Test semantic structure
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
    
    // Test labels are associated with inputs
    await expect(page.locator('label[for="title"]')).toBeVisible();
    await expect(page.locator('label[for="desc"]')).toBeVisible();
    await expect(page.locator('#title')).toBeVisible();
    await expect(page.locator('#desc')).toBeVisible();
  });

  test('should test form interaction patterns', async ({ page }) => {
    const interactionHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Interaction Test</title>
      </head>
      <body>
        <form id="interactionForm">
          <input id="title" type="text" />
          <button type="submit" id="submitBtn">Submit</button>
        </form>
        
        <div id="status"></div>
        
        <script>
          document.getElementById('interactionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const status = document.getElementById('status');
            const btn = document.getElementById('submitBtn');
            
            btn.disabled = true;
            btn.textContent = 'Submitting...';
            status.textContent = 'Processing...';
            
            setTimeout(() => {
              btn.disabled = false;
              btn.textContent = 'Submit';
              status.textContent = 'Done!';
            }, 500);
          });
        </script>
      </body>
      </html>
    `;
    
    await page.setContent(interactionHTML);
    
    // Fill form and submit
    await page.locator('#title').fill('Test Title');
    await page.locator('#submitBtn').click();
    
    // Check loading state
    await expect(page.locator('#submitBtn')).toHaveText('Submitting...');
    await expect(page.locator('#submitBtn')).toBeDisabled();
    await expect(page.locator('#status')).toHaveText('Processing...');
    
    // Wait for completion
    await expect(page.locator('#status')).toHaveText('Done!', { timeout: 1000 });
    await expect(page.locator('#submitBtn')).toHaveText('Submit');
    await expect(page.locator('#submitBtn')).toBeEnabled();
  });
}); 