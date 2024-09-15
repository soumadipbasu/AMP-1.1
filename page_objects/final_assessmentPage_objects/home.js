import { homePageLocator } from '../../locators/final_assessmentLocators/homeLocators';
import testData from '../../test_data/final_assessment_urls.json';

export class HomePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.FragranceTab = homePageLocator.FragranceTab;
    }

    async goToFragranceTab() {
        // Step 1: Go to the website
        await this.page.goto(testData.automation_url);
        await this.page.click(this.FragranceTab); // Adjust the selector if necessary
    }
}

