import { expect } from '@playwright/test';
import { loginPagelocators } from './../locators/loginPage';
import { url, user   } from '../test_data/loginData.json';
const { generateRandomName, generateRandomEmail, generatePassword } = require('./../test_data/userCreation');

export class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.loginLink = loginPagelocators.loginLink;
        this.emailInput = loginPagelocators.emailInput;
        this.passwordInput = loginPagelocators.passwordInput;
        this.loginButton = loginPagelocators.loginButton;
        this.loggedInUser = loginPagelocators.loggedInUser;
        this.logoutButton = loginPagelocators.logoutButton;
        this.nameInput = loginPagelocators.nameInput;
        this.emailInput = loginPagelocators.emailInput;
        this.signUpButton = loginPagelocators.signUpButton;
        this.MrRadio = loginPagelocators.MrRadio;
    }

    async navigateToURL() {
        await this.page.goto(url);
        console.log('Successfully navigated to the URL', url);
    }

    async clickLoginLink() {
        await this.page.click(this.loginLink);
    }

    async loginwithValidCreds(email, password) {
        await this.page.fill(this.emailInput, email);
        console.log('email', email);
        await this.page.fill(this.passwordInput, password);
        console.log('password', password);
        await this.page.click(this.loginButton);
    }

    async verifyLogin() {
        await this.page.waitForSelector(this.loggedInUser);
        await expect(this.page.locator(this.loggedInUser)).toBeVisible();
        console.log('Successfully verified the logged in user', user);
    }

    async verifyLogout() {
        await this.page.click(this.logoutButton);
        await this.page.waitForSelector(this.loginLink);
        await expect(this.page.locator(this.loginLink)).toBeVisible();
        console.log('logged out successfully');
    }

    async signUp() {
        await expect(this.page.locator(this.loginLink)).toBeVisible();
        await this.page.click(loginPagelocators.loginLink);
        const randomName = generateRandomName();
        const randomEmail = generateRandomEmail();
        const password = generatePassword();
        console.log(`Name: ${randomName}`);
        console.log(`Email: ${randomEmail}`)
        console.log(`Password: ${password}`)
        await this.page.fill(loginPagelocators.nameInput, randomName);
        await this.page.fill(loginPagelocators.signUpemail, randomEmail);
        await this.page.click(loginPagelocators.signUpButton);
        await this.page.click(loginPagelocators.MrRadio);
        await this.page.fill('input[name="password"]', password);
        await this.page.fill('input[name="first_name"]', randomName);
        await this.page.fill('input[name="last_name"]', randomName);
        await this.page.fill('input[name="company"]', 'Example Inc.');
        await this.page.fill('input[name="address1"]', '123 Main St');
        await this.page.fill('input[name="address2"]', 'Apt 4B');
        await this.page.fill('input[name="state"]', 'California');
        await this.page.fill('input[name="city"]', 'Los Angeles');
        await this.page.fill('input[name="zipcode"]', '90001');
        await this.page.fill('input[name="mobile_number"]', '1234567890');
        await this.page.click('button[data-qa="create-account"]');
        await this.page.waitForSelector('h2[class="title text-center"] b');
        const isDisplayed = await this.page.isVisible('h2[class="title text-center"] b');
        expect(isDisplayed).toBeTruthy();
    }



}