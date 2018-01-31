import * as fs from 'fs';
import parserFromXml from './parser';
import { renderStylesheet } from './style/stylesheet.utils';
import { fillWithData } from './template/cee-template.utils';
import render from './render';

/**
 * Method that build PDF retrieved to user from
 * data in a XML. All params are absolute paths.
 *
 * @param {string} xmlPath
 * @param {string} pdfDest
 * @param {string} numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 */
async function getPDFFromXml(xmlPath: string, pdfDest: string, numReferencia: string) {
  let xml;
  try {
    xml = fs.readFileSync(xmlPath, { encoding: 'utf8' });
  } catch (err) {
    throw err;
  }
  if (!fs.existsSync(pdfDest)) throw new Error('Destination path does not exists');
  const summary = parserFromXml(xml);
  summary.setRegistro(numReferencia);
  const htmlString = fillWithData(summary);
  const pdfFilePath = await render(htmlString, numReferencia, renderStylesheet(), pdfDest);
  return pdfFilePath;
}

export { getPDFFromXml };
