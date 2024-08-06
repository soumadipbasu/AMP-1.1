const { test, expect } = require("@playwright/test");
const exp = require("constants");

test("open_browser", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const passWord = page.locator("#password");
  const blinkText = page.locator(".blinkingText");
  const allProducttitles = page.locator(".card-body a");
  const loginButton = page.locator("input[type='submit']");

  // unsuccessful login test
  await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
  await userName.fill("rahulshettyacademy123");
  await passWord.fill("learning123");
  await page.locator('input[type="submit"]').click();
  await expect(page.locator("[style*=block]")).toContainText(
    "Incorrect username/password."
  );

  // success login test
  await userName.fill("rahulshettyacademy");
  await passWord.fill("learning");

  // Represents a radio element handling on the page.
  await page.locator(".radiotextsty").last().click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  // Represents a web based pop up handling on the page.
  await page.locator("#okayBtn").click();

  // Represents a dropdown element handling on the page.
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Consultant");

  // Represents a checkbox element handling on the page.
  const checkbox = page.locator("#terms");
  await checkbox.click();
  await expect(checkbox).toBeChecked();
  await checkbox.uncheck();
  expect(await checkbox.isChecked()).toBeFalsy();

  // Click on signin button 
  await loginButton.click();

  // Verify the login is  successful & printing some product name & array of all product names
  console.log(await allProducttitles.nth(1).innerText());
  console.log(await allProducttitles.last().innerText());
  const titles = await allProducttitles.allTextContents();
  console.log(titles);

  // Verify the blinking text is displayed on the page
  await page.goBack();
  await expect(blinkText).toBeVisible();
  await expect(blinkText).toHaveAttribute("class", "blinkingText");

  // handling separate tab context
  const [newPage] = await Promise.all([context.waitForEvent('page'), blinkText.click()]);
  await newPage.waitForSelector('.im-para.red');
  const documentContent = await newPage.locator('.im-para.red').allTextContents();
  const text = documentContent[0].split('@');
  const domain = text[1].split(' ')[0];
  console.log(domain);

  // dropdown (ui/li where select metnod not working) handle in separate child tab
  await newPage.locator("//div[@class='nav-outer clearfix']//a[@class='dropdown-toggle'][normalize-space()='More']").hover(); // Hover to expand the first dropdown
  await newPage.locator('ul.dropdown-menu >> text="About us"').first().click();
  const isVisible = await newPage.locator("div[class='inner-box'] h1").isVisible();
  expect(isVisible).toBeTruthy();

  // Activate parent window from child window
  await page.bringToFront()
  await page.waitForSelector(".blinkingText");
  await expect(blinkText).toBeVisible();  
});
