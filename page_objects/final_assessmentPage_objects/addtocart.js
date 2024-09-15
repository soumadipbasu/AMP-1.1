import assert from 'assert';

import { fragnanceLocator } from '../../locators/final_assessmentLocators/fragnanceLocator';
import {cartLocator} from '../../locators/final_assessmentLocators/cartLocator';
import {checkoutLocator} from '../../locators/final_assessmentLocators/checkoutLocator';
import { FragrancePage } from '../../page_objects/final_assessmentPage_objects/fragnance';
import { homePageLocator } from '../../locators/final_assessmentLocators/homeLocators';


export class AddToCart {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.sort = fragnanceLocator.sort;
        this.ascendingOrder = fragnanceLocator.ascendingOrder;
        this.ascendingOrderProductbyPrice = fragnanceLocator.ascendingOrderProductbyPrice;
        this.productElelement = fragnanceLocator.productElement;
        this.productName = fragnanceLocator.productName;
        this.noStock = fragnanceLocator.noStock;
        this.addProducttoCart = cartLocator.addProducttoCart;
        this.home = homePageLocator.home;
        this.Cart = cartLocator.Cart;
        this.totalAmount = cartLocator.totalAmount;
        this.checkOut = checkoutLocator.checkout;
        this.guestCheckout = checkoutLocator.guestCheckout;
        this.continueButton = checkoutLocator.continueButton;
        this.firstName = checkoutLocator.firstName;
        this.lastName = checkoutLocator.lastName;
        this.email = checkoutLocator.email;
        this.telephone = checkoutLocator.telephone;
        this.address1 = checkoutLocator.address1;
        this.city = checkoutLocator.city;
        this.zone = checkoutLocator.zone;
        this.postCode = checkoutLocator.postCode;
        this.country = checkoutLocator.country;
        this.finalCheckout = checkoutLocator.finalCheckout;
        this.successMessage = checkoutLocator.successMessage;
    }

    async addProductsToCart() {
        const fragrance = new FragrancePage(this.page);
        const products = await fragrance.fetchProductDetails()
        for (const product of products) {
            await this.page.click(`text=${product.name}`);
            const noStock = await this.page.$(this.noStock);
            if (!noStock) {
                await this.page.click(this.addProducttoCart);
            }
            await this.page.goBack();
            await this.page.goBack();
        }
        // Navigate to the cart
        await this.page.click(this.home);
        await this.page.click(this.Cart);
        
        // Verify the total amount
        const totalAmount = await this.page.textContent(this.totalAmount);
        console.log('Total Amount:', totalAmount);
        console.assert(totalAmount === '$427.00', 'The total amount is not $427.00');
        assert.strictEqual(totalAmount, '$427.00', 'The total amount is not $427.00');
        }
}