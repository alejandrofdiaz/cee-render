import { getPDFFromXml, getHtmlFromXmlString } from '../index';
import * as path from 'path';
import * as fs from 'fs';

const dirname = process.cwd();
const destinationValidPath = path.resolve(process.cwd(), 'temp');
const destinationFakePath = path.resolve(process.cwd(), 'tempo');

const xmlFakePath = '32131.xml';
const xmlValidPath = path.resolve(dirname, 'bin', 'PLAZAFalsa.xml');

describe('Test index', () => {
  test('File Not found exception', async () => {
    await expect(getPDFFromXml(xmlFakePath, destinationValidPath, '32131231')).rejects.toThrow();
  });

  test('Get pdf from xml test', async () => {
    await expect(
      getPDFFromXml(xmlValidPath, destinationValidPath, '251155-30/01/2018 22:44:31')
    ).toBeTruthy();
  });

  test('Destination path does not exists', async () => {
    await expect(getPDFFromXml(xmlValidPath, destinationFakePath, 'test')).rejects.toThrowError();
  });
});

describe('getHtmlFromXmlString', () => {
  let xml: string;
  try {
    xml = fs.readFileSync(xmlValidPath, { encoding: 'utf8' });
  } catch (err) {
    throw err;
  }

  test('Not to throw exception', () => {
    expect(() => getHtmlFromXmlString(xml, '123456789')).not.toThrowError();
  });
});
