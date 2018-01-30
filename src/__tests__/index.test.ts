import { getPDFFromXml } from '../index';
import * as path from 'path';

const dirname = process.cwd();

describe('Test index', () => {
  test('File Not found exception', async () => {
    const fakePath = '32131.png';
    await expect(getPDFFromXml(fakePath, '32131231')).rejects.toThrow();
  });

  test('Get pdf from xml test', async () => {
    const xmlPath = path.resolve(dirname, 'bin', 'PLAZAIGLESIA9.xml');
    await expect(getPDFFromXml(xmlPath, '251155-30/01/2018 22:44:31')).toBeTruthy();
  });
});
