# AMP_1.1
This repository is dedicated to sharing and reviewing AMP 1.1 assessments.

## Framework Structure

The following is the structure of the framework:
### Key Files and Components

- **tests/**: Contains all test files.
  - **web/**: Contains web UI test files for reference.
  - **playwright_assessment/**: Contains each assessment test files by date of sessions.
  - **final_assessment/**: Contain the final assessment test file.
- **page_object/**: Contains page object files for different pages of the application.
- **locators/**: Contains all the locator files such as login, Product etc pages.
- **test-data/**: test data files such as execel, user-creation etc.
- **excel-data/**: .xlsxtest data file for the playwright_assessment5.
- **image/**: .png data file for the playwright_assessment6 visual automation.
- **.env.sample**: Sample Environment configuration file.
- **playwright.config.js**: Configuration file for Playwright.
- **README.md**: Documentation file for the project.

## Final Assessment Key Files and Structure
 - **tests/final_assesment**: Contains the final assessment test files.
 - **page_object/final_assessmentPage_objects**: Contains page object files for final assessment
 - **locators/final_assessmentLocators**: Contains all the locator files for final assessment.
 - **test-data/final_assessment_urls.json**: test data files for final assessment.
 - **test-data/products.xlsx**: excel file of the product list for final assessment.

## Prerequisites

Before running the tests, ensure you have completed the following steps:

- **Create a `.env` File**:
   - Copy the sample environment configuration file data from `.env.sample` file and create a new `.env` file.
- **Install Required Packages**: Included the `npm install` command to install all necessary dependencies.

## Test Run

- **Running Tests Section**: To run the test please run the command `npm run webTest`, which will run the test that mentioned in the environment file.

## Report

- **Playwright HTML Report Section**: Playwright will automatically generate and open an HTML report in the default browser after the test run. Please run the `npx playwright show-report` command to generate report manually.





