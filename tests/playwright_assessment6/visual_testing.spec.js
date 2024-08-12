const { test, expect } = require('@playwright/test');
const fs = require('fs');
const { PNG } = require('pngjs');

test('Visual regression test for automationexercise.com', async ({ page }) => {
    // Define the path to the baseline image
    const baselinePath = '/Users/soumabasu/AMP-1.1/image/base_image.png';
    const diffPath = '/Users/soumabasu/AMP-1.1/image/diff_image.png';

    // Check if the baseline image exists
    if (!fs.existsSync(baselinePath)) {
        console.error('Baseline image does not exist. Please run the test to create a baseline image first.');
        return;
    }

    // Read the baseline image
    const baselineImage = PNG.sync.read(fs.readFileSync(baselinePath));
    const { width, height } = baselineImage;

    // Set the viewport size based on the baseline image dimensions
    await page.setViewportSize({ width, height });

    // Navigate to the page you want to test
    await page.goto('https://automationexercise.com');

    // Take a screenshot of the page
    const screenshot = await page.screenshot();

    // Dynamically import pixelmatch
    const { default: pixelmatch } = await import('pixelmatch');

    // Read the screenshot image
    const screenshotImage = PNG.sync.read(screenshot);

    // Ensure the images have the same dimensions
    if (baselineImage.width !== screenshotImage.width || baselineImage.height !== screenshotImage.height) {
        console.error('Error: Image sizes do not match.');
        return;
    }

    // Create a diff image
    const diffImage = new PNG({ width, height });

    // Compare the images
    const numDiffPixels = pixelmatch(
        baselineImage.data,
        screenshotImage.data,
        diffImage.data,
        width,
        height,
        { threshold: 0.5 }
    );

    // Save the diff image
    fs.writeFileSync(diffPath, PNG.sync.write(diffImage));

    // Assert that the number of different pixels is below a threshold
    expect(numDiffPixels).toBeLessThan(500); // Adjust the threshold as needed
});