import * as path from 'path';
import * as puppeteer from 'puppeteer';
import renderStylesheet from './style/stylesheet.utils';

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

  const absolutePath = path.resolve(CWDPath, DEFAULT_BIN_PATH, filename, `${filename}.pdf`);
  await page.pdf({
    path: absolutePath,
    printBackground: true,
    format: 'A4'
  });
  await browser.close();

  return absolutePath;
}

export default render;
