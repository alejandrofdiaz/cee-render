import * as fs from 'fs';
import parserFromXml from './parser';
import { fillWithData } from './contentHtml';
import render from './render';

/**
 * Method that build PDF retrieved to user from
 * data in a XML
 *
 * @param {string} absolutePath
 * @param {string} numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 */
async function getPDFFromXml(absolutePath, numReferencia) {
  const xml = fs.readFileSync(absolutePath, { encoding: 'utf8' });
  const summary = parserFromXml(xml);
  summary.setRegistro(numReferencia);
  const htmlString = fillWithData(summary);
  const pdfFilePath = await render(htmlString, numReferencia);
  return pdfFilePath;
}

export { getPDFFromXml };
