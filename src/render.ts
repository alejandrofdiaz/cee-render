import * as path from 'path';
import * as puppeteer from 'puppeteer';

/**
* @description Renders a html template into a PDF file. Returns its filepath.
 *
 * @param {string} html
 * @param {string} filename how it should be named
 * @param {string} stylesheet
 * @param {string} destination
 * @returns {string} absolutePath
 */
async function render(html: string, filename: string, stylesheet: string, destination: string) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.setContent(replaceStyle(html, stylesheet));
  /**
   * WORKARAOUNDED:
   * addStyleTag have to wait until browser loads base64 font src and does not right now.
   * So base64 data is attached since setContent method.
   */
  // await page.addStyleTag({ content: stylesheet});
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

/**
 * @description Replaces rendered stylesheet into html body
 * @param {string} html
 * @param {string} stylesheet
 * @returns {string}
 */
function replaceStyle(html: string, stylesheet: string = ''): string {
  return html.replace('</head>', `<style>${stylesheet}</style></head>`);
}

export default render;
export { replaceStyle };
