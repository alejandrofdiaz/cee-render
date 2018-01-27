const parser = require('./parser');
const contentHtml = require('./contentHtml');
const fs = require('fs');
const path = require('path');

const xml = fs.readFileSync(path.resolve(__dirname, '../../docs/XMLTest.xml'), {
  encoding: 'utf8'
});

const parsed = parser.parseDataFromSummary(xml);
console.log(parsed);
