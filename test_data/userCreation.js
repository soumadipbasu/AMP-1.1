// test/data/userCreation.js

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomPassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateRandomName() {
    return generateRandomString(8); // Generates a random name of 8 characters
}

function generatePassword() {
    return generateRandomString(8); // Generates a random name of 8 characters
}

function generateRandomEmail() {
    const randomString = generateRandomString(8); // Generates a random string of 8 characters
    return `${randomString}@yopmail.com`;
}

module.exports = {
    generateRandomName,
    generateRandomEmail,
    generatePassword
};