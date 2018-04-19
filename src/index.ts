import * as fs from 'fs';
import parserFromXml from './parser';
import { renderStylesheet } from './style/stylesheet.utils';
import { fillWithData } from './template/cee-template.utils';
import render, { replaceStyle } from './render';

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
  return await getPDFFromXmlString(xml, pdfDest, numReferencia);
}

/**
 * Method that build PDF retrieved to user from
 * data in a string. All params are absolute paths.
 *
 * @param xmlString
 * @param pdfDest
 * @param numReferencia
 * @returns {string} path where to get the pdf built to send it to user
 */
async function getPDFFromXmlString(
  xmlString: string,
  pdfDest: string,
  numReferencia: string
): Promise<string> {
  if (!fs.existsSync(pdfDest)) throw new Error('Destination path does not exists');
  const summary = parserFromXml(xmlString);
  summary.setRegistro(numReferencia);
  const htmlString = fillWithData(summary);
  const pdfFilePath = await render(htmlString, numReferencia, renderStylesheet(), pdfDest);
  return pdfFilePath;
}

/**
 * @description Renders HTML from xml data
 * @param xmlString
 * @param numReferencia
 * @returns {string} Html rendered with style
 */
function getHtmlFromXmlString(xmlString: string, numReferencia: string): string {
  const summary = parserFromXml(xmlString);
  summary.setRegistro(numReferencia);
  const htmlString = fillWithData(summary);
  const htmlStringStyled = replaceStyle(htmlString, renderStylesheet());
  return htmlStringStyled;
}


export { getPDFFromXml, getPDFFromXmlString, getHtmlFromXmlString };
