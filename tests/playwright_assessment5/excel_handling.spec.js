const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');
const excelFile = './execl_data/ExcelAssessment.xlsx'

test('Validating and handling excel values', async () => {
    // Load the workbook
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFile);
    const worksheet = workbook.getWorksheet(1);

    // Read the price cell value for the 3rd row (assuming price is in column B)
    const priceCell = worksheet.getCell('E5');
    const originalPrice = priceCell.value;
    console.log(`Original Price: ${originalPrice}`);

    // Update the price to 600
    priceCell.value = 600;
    await workbook.xlsx.writeFile(excelFile);

    // Reload the workbook to validate the update
    const updatedWorkbook = new ExcelJS.Workbook();
    await updatedWorkbook.xlsx.readFile(excelFile);
    const updatedWorksheet = updatedWorkbook.getWorksheet(1);
    const updatedPrice = updatedWorksheet.getCell('E5').value;
    expect(updatedPrice).toBe(600);
    console.log(`Updated Price: ${updatedPrice}`);

    // Find the cell with value 'Apple'
    let found = false;
    updatedWorksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Apple') {
                console.log(`Found "Apple" at Row ${rowNumber}, Column ${colNumber}`);
                found = true;
            }
        });
    });

    if (!found) {
        console.log('"Apple" not found in the sheet.');
    }
    
});