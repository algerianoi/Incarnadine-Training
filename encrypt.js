const fs = require('fs');
const CryptoJS = require('crypto-js');

const jsonData = fs.readFileSync('units.json', 'utf8');

const password = fs.readFileSync('password.txt', 'utf8').trim();
const encryptedData = CryptoJS.AES.encrypt(jsonData, password).toString();

fs.writeFileSync('encrypted-units.json', encryptedData);
console.log('JSON file encrypted and saved as encrypted-units.json');
