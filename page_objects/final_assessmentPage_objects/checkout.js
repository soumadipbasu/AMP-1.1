import assert from 'assert';
import testData from '../../test_data/final_assessment_urls.json';
import { fragnanceLocator } from '../../locators/final_assessmentLocators/fragnanceLocator';
import {cartLocator} from '../../locators/final_assessmentLocators/cartLocator';
import { homePageLocator } from '../../locators/final_assessmentLocators/homeLocators';
import {checkoutLocator} from '../../locators/final_assessmentLocators/checkoutLocator';


export class CheckOut {
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

    async completeCheckoutProcess() {
        const totalAmount = await this.page.textContent(this.totalAmount);
        await this.page.click(this.checkOut);
        await this.page.click(this.guestCheckout);
        await this.page.click(this.continueButton);
        await this.page.waitForSelector(this.firstName, { timeout: 5000 });
        await this.page.fill(this.firstName, testData.firstName);
        await this.page.waitForSelector(this.lastName, { timeout: 5000 });
        await this.page.fill(this.lastName, testData.lastName);
        await this.page.fill(this.email, testData.email);
        await this.page.fill(this.telephone, testData.telephone);
        await this.page.fill(this.address1, testData.address);
        await this.page.fill(this.city, testData.city);
        await this.page.selectOption(this.zone, testData.zone); 
        await this.page.fill(this.postCode, testData.postCode);
        await this.page.selectOption(this.country, testData.country);
        await this.page.click(this.continueButton);
        assert.strictEqual(totalAmount, testData.total_amount, 'The total amount is not $427.00');
        await this.page.click(this.finalCheckout);
        const confirmationText = await this.page.textContent(this.successMessage);
        console.log('Order Confirmation Text:', confirmationText);
        assert.strictEqual(confirmationText, testData.order_success_message, 'The order confirmation text is incorrect'); 

    }
}