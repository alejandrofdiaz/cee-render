import * as fs from 'fs';
import parserFromXml from './parser';
import { renderStylesheet } from './style/stylesheet.utils';
import { fillWithData } from './template/cee-template.utils';
import render from './render';

/**
 * Method that build PDF retrieved to user from
 * data in a XML
 *
 * @param {string} absolutePath
 * @param {string} numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 */
async function getPDFFromXml(absolutePath: string, numReferencia: string) {
  let xml;
  try {
    xml = fs.readFileSync(absolutePath, { encoding: 'utf8' });
  } catch (err) {
    throw err;
  }
  const summary = parserFromXml(xml);
  summary.setRegistro(numReferencia);
  const htmlString = fillWithData(summary);
  const pdfFilePath = await render(htmlString, numReferencia, renderStylesheet());
  return pdfFilePath;
}

export { getPDFFromXml };
