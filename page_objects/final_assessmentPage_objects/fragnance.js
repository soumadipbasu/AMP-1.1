import { expect } from '@playwright/test';
const xlsx = require('xlsx');

import { fragnanceLocator } from '../../locators/final_assessmentLocators/fragnanceLocator';
import { homePageLocator } from '../../locators/final_assessmentLocators/homeLocators';
import {cartLocator} from '../../locators/final_assessmentLocators/cartLocator';
import {checkoutLocator} from '../../locators/final_assessmentLocators/checkoutLocator';

export class FragrancePage {
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

    async sortProductAscending() {
        await this.page.selectOption(this.sort, { value: this.ascendingOrder });
        await this.page.waitForSelector(this.ascendingOrderProductbyPrice);
    }

    async fetchProductDetails() {
        const products = await this.page.$$eval(this.productElelement, elements => {
            return elements.map(el => {
                const name = el.querySelector('.prdocutname').textContent.trim();
                const priceElement = el.querySelector('.price .oneprice, .price .pricenew');
                const price = priceElement ? priceElement.textContent.trim() : 'N/A';
                return { name, price };
            });
        });
        console.log(products);
        console.log('Total Product Count:', products.length);
        return products; // Add this line to return the products array
    }

    async saveDatainExcel() {
        const products = await this.fetchProductDetails();
        const worksheet = xlsx.utils.json_to_sheet(products);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');
        xlsx.writeFile(workbook, './test_data/products.xlsx');
        const worksheet_product = workbook.Sheets['Products'];
        const excelData = xlsx.utils.sheet_to_json(worksheet_product);
        expect(excelData).toEqual(products);
    }
}