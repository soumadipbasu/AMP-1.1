import { test } from '@playwright/test';
import { LoginPage } from '../../page_objects/login';
import { ProductPage } from '../../page_objects/product';
import { email1, password1,email2, password2 } from '../../test_data/loginData.json';
import { productPagelocators } from '../../locators/productPage';

test.describe('Automating the assessment scenarios in automationexercise.com', () => {
    test('Login to automationexercise.com',{ tag: '@login',}, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToURL();
        await loginPage.clickLoginLink();
        await loginPage.loginwithValidCreds(email1, password1);
        await loginPage.verifyLogin();
    })


    test('User Sign Up',{ tag: '@signup',}, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateToURL();
        await loginPage.signUp();
    });

    test('Add first 2 products to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addTwoProductsToCart();

    });

    test('login with two different valid credentials & verify added products to cart for each user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productPage = new ProductPage(page);
        await loginPage.verifyLogout();
        await loginPage.clickLoginLink();
        await loginPage.loginwithValidCreds(email1, password1);
        await loginPage.verifyLogin();
        await productPage.addProductToCart(productPagelocators.viewFirstProduct, '500');
        await loginPage.verifyLogout();
        await loginPage.clickLoginLink();
        await loginPage.loginwithValidCreds(email2, password2);
        await loginPage.verifyLogin();
        await productPage.addProductToCart(productPagelocators.viewSecondProduct, '400');
    });

});