const { test } = require('@playwright/test');
import { HomePage } from '../../page_objects/final_assessmentPage_objects/home';
import { FragrancePage } from '../../page_objects/final_assessmentPage_objects/fragnance';
import { AddToCart } from '../../page_objects/final_assessmentPage_objects/addtocart';
import { CheckOut } from '../../page_objects/final_assessmentPage_objects/checkout';

test.beforeEach('Go to automationteststore.com & Navigate to Fragrance Tab', async ({ page }) => {
    const home = new HomePage(page);
    await home.goToFragranceTab();
});

test.beforeEach('Sort products by price in ascending order & fetch product details', async ({ page }) => {
    const Fragrance = new FragrancePage(page);
    await Fragrance.sortProductAscending();
    await Fragrance.fetchProductDetails();
});

test.beforeEach('Save the product details into an Excel file', async ({ page }) => {
    const Fragrance = new FragrancePage(page);
    await Fragrance.saveDatainExcel();
});

test.beforeEach('Add products to the cart & verify the total amount', async ({ page }) => {
    const AddtoCart = new AddToCart(page);
    await AddtoCart.addProductsToCart();
});

test('Complete the checkout process', async ({ page }) => {
    const Checkout = new CheckOut(page);
    await Checkout.completeCheckoutProcess();
});

        



    


