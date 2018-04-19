import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';

import { getHtmlFromXmlString } from './src/index';

const app = express();

const dirname = process.cwd();
const xmlValidPath = path.resolve(dirname, 'bin', 'PLAZAFalsa.xml');

let xml: string;
try {
  xml = fs.readFileSync(xmlValidPath, { encoding: 'utf8' });
} catch (err) {
  throw err;
}

app.get('/', (req, res) => {
  res.send(getHtmlFromXmlString(xml, 'TEST TEST'));
});

app.listen(8080, () => {
  console.log('API listening on port 8080');
});
