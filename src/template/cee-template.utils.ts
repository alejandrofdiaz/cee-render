import * as fs from 'fs';
import * as path from 'path';

import { SummaryCertificado } from '../model';

const HTML_TEMPLATE_PATH = './cee-template.html';

const getHtml = () =>
  fs.readFileSync(path.resolve(__dirname, HTML_TEMPLATE_PATH), { encoding: 'utf8' });

/**
 * Given a summaryCertificado object like class, returns templated
 * rendered
 * @param {SummaryCertificado} summary
 * @returns {string} htmlStringlike filled with data
 */
function fillWithData(summary: SummaryCertificado) {
  const rawContent = getHtml();
  return renderString(rawContent, summary);
}

/**
 * Given any object, replaces its attribute values inside and curlybraced string template.
 * @param {string} stringTemplate
 * @param {any} object
 * @returns {string} htmlStringlike filled with data
 */
function renderString(stringTemplate: string, object: any) {
  let finalContent = Object.keys(object).reduce(
    (prev, key) => prev.replace(`{{${key}}}`, object[key]),
    stringTemplate
  );
  return finalContent;
}

/**
 * Remove braces not replaced
 *
 * @param stringTemplate
 * @returns {string}
 */
function removeSpareBraces(stringTemplate: string) {
  const bracesRegex = /{{\*}}/g;
  console.log(stringTemplate.replace(bracesRegex, ''));
}

export { renderString, fillWithData, removeSpareBraces };
