import * as path from 'path';
import * as puppeteer from 'puppeteer';
import renderStylesheet from './style/stylesheet';

const CWDPath = process.cwd();

/**
 * Renders a html template into a PDF file.
 *
 * @param {string} html
 * @param {string} filename how it should be named
 * @returns {string} absolutePath
 */
async function render(html: string, filename: string) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulateMedia('screen');
  await page.setContent(html);
  await page.addStyleTag({ content: renderStylesheet() });

  const absolutePath = path.resolve(CWDPath, 'temp', filename, `${filename}.pdf`);
  await page.pdf({
    path: absolutePath,
    printBackground: true,
    format: 'A4'
  });
  await browser.close();

  return absolutePath;
}

export default render;
