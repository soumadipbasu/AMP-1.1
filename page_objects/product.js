import { expect } from '@playwright/test';
import { productPagelocators } from './../locators/productPage';

export class ProductPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.firstProduct = productPagelocators.firstProduct;
        this.secondProduct = productPagelocators.secondProduct;
        this.addTocart = productPagelocators.addTocart;
        this.continueShopping = productPagelocators.continueShopping;
        this.viewFirstProduct = productPagelocators.viewFirstProduct;
        this.viewSecondProduct = productPagelocators.viewSecondProduct;
        this.viewCart = productPagelocators.viewCart;
        this.firstProductCartPrice = productPagelocators.firstProductCartPrice;
        this.secondProductCartPrice = productPagelocators.secondProductCartPrice
        this.checkout = productPagelocators.checkout;
        this.totalAmount = productPagelocators.totalAmount
        this.cartTotal = productPagelocators.cartTotal;
        this.removeCartProduct = productPagelocators.removeCartProduct;
        this.cartProductTable = productPagelocators.cartProductTable;
        this.home = productPagelocators.home;
        this.cartEmpty = productPagelocators.cartEmpty;
    }
    async addTwoProductsToCart() {
        await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await this.page.click(this.addTocart);
        await this.page.click(this.removeCartProduct);
        await this.page.click(this.viewFirstProduct);
        await this.page.click(this.addTocart);
        await this.page.waitForSelector(this.continueShopping);
        await this.page.click(this.continueShopping);
        await this.page.goBack();
        await this.page.click(this.viewSecondProduct);
        await this.page.click(this.addTocart);
        await this.page.waitForSelector(this.continueShopping);
        await this.page.click(this.continueShopping);
        await this.page.goBack();
        await this.page.click(this.viewCart);
            
        const firstProductCartPrice = await this.page.$eval(this.firstProductCartPrice, el => parseFloat(el.innerText.replace('Rs. ', '')));
        const secondProductCartPrice = await this.page.$eval(this.secondProductCartPrice, el => parseFloat(el.innerText.replace('Rs. ', '')));
            
        console.log(`First Product Price: Rs. ${firstProductCartPrice}`);
        console.log(`Second Product Price: Rs. ${secondProductCartPrice}`);
            
        await this.page.click(this.checkout);
            
        const totalAmount = await this.page.$eval(this.totalAmount, el => parseFloat(el.innerText.replace('Rs. ', '')));
            
        console.log(`Total Amount: Rs. ${totalAmount}`);
        await this.page.click(this.checkout);
        try {
         if ((firstProductCartPrice + secondProductCartPrice) !== totalAmount) {
                throw new Error("Total Amount is incorrect");
            }
             console.log("Total Amount is correct");
        } catch (error) {
            console.error("An error occurred while adding products to the cart:", error);
            throw error; // Re-throw the error to ensure the test fails
        }
   }

   async addProductToCart(productSelector, expectedCartValue) {
    await this.page.evaluate(() => window.scrollBy(0, window.innerHeight));
    await this.page.click(this.home);
    await this.page.click(productSelector);
    await this.page.click(this.addTocart);
    await this.page.click(this.continueShopping);
    await this.page.goBack();
    await this.page.click(this.viewCart);
    expect(await this.page.isVisible(productSelector)).toBeTruthy();
    const CartPrice = await this.page.$eval(this.cartTotal, el => parseFloat(el.innerText.replace('Rs. ', '')));
    expect(CartPrice).toBe(Number(expectedCartValue));
}
}