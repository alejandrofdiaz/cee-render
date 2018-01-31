import * as path from 'path';
import * as puppeteer from 'puppeteer';

/**
 * Renders a html template into a PDF file. Returns its filepath.
 *
 * @param {string} html
 * @param {string} filename how it should be named
 * @param {string} stylesheet
 * @param {string} destination
 * @returns {string} absolutePath
 */
async function render(html: string, filename: string, stylesheet: string, destination: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.setContent(html);
  await page.addStyleTag({ content: stylesheet });
  const _filename = new Buffer(`${filename},${new Date().toString()}`).toString('base64');
  const pdfAbsolutePath = path.resolve(destination, `${_filename}.pdf`);
  await page.pdf({
    path: pdfAbsolutePath,
    printBackground: true,
    format: 'A4'
  });
  await browser.close();
  return pdfAbsolutePath;
}

export default render;
