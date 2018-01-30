import * as path from 'path';
import * as puppeteer from 'puppeteer';

const DEFAULT_BIN_PATH = 'temp';
const CWDPath = process.cwd();

/**
 * Renders a html template into a PDF file. Returns its filepath.
 *
 * @param {string} html
 * @param {string} filename how it should be named
 * @param {string} stylesheet
 * @returns {string} absolutePath
 */
async function render(html: string, filename: string, stylesheet: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.setContent(html);
  await page.addStyleTag({ content: stylesheet });

  const _filename = new Buffer(`${filename},${new Date().toString()}`).toString('base64');
  const pdfAbsolutePath = path.resolve(CWDPath, DEFAULT_BIN_PATH, `${_filename}.pdf`);
  // const htmlAbsolutePath = path.resolve(CWDPath, DEFAULT_BIN_PATH, `${_filename}.html`);
  await page.pdf({
    path: pdfAbsolutePath,
    printBackground: true,
    format: 'A4'
  });

  // fs.writeFileSync(htmlAbsolutePath, html);

  await browser.close();

  return pdfAbsolutePath;
}

export default render;
