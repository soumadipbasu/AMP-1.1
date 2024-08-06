const { test, expect } = require('@playwright/test');

test.describe('DemoQA New Window Test', () => {

  test('Open a new window and fetch text', async ({ page, context }) => {
	// Navigate to the specified URL
	await page.goto('https://demoqa.com');
    await page.evaluate(() => window.scrollBy(0, window.innerHeight));

	// Click on the "Alerts, Frame & Windows" section
	await page.click('h5:has-text("Alerts, Frame & Windows")');

	// Click on "Browser Windows"
	await page.click('text=Browser Windows');

	// Click on "New Window" and handle the new window
	const [newPage] = await Promise.all([
	  context.waitForEvent('page'),
	  page.click('button:has-text("New Window")')
	]);

	// Wait for the new page to load
	await newPage.waitForLoadState();

	// Fetch the text from the new window
	const newWindowText = await newPage.locator('body').innerText();
	console.log(`Text from new window: ${newWindowText}`);

	// Close the new window
	await newPage.close();
    await page.waitForTimeout(2000);

	// Verify that the parent window is still open
	expect(await page.isVisible('#windowButton')).toBeTruthy();
    expect(await page.isVisible("//span[normalize-space()='Browser Windows']")).toBeTruthy();
  });

});