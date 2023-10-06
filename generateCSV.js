// filename: generateCSV.js
const fs = require('fs');
const { faker } = require('@faker-js/faker');

function generateCSV(numberOfRows) {
    let csvContent = "Model Number,Unit Price,Quantity\n"; // header

    for (let i = 0; i < numberOfRows; i++) {
        const modelNumber = faker.string.alpha(10);
        const unitPrice = parseFloat(faker.commerce.price({ min: 100, max: 1000, dec: 3 }));
        const quantity = faker.number.int({min: 1, max: 1000});

        csvContent += `${modelNumber},${unitPrice},${quantity}\n`;
    }

    return csvContent;
}

const rows = parseInt(process.argv[2]) || 1000; // If no argument is provided, it defaults to 1000
fs.writeFileSync('fakeData.csv', generateCSV(rows));
console.log(`CSV file generated with ${rows} rows.`);
