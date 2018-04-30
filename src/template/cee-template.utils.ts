import * as fs from 'fs';
import * as path from 'path';
import { compile } from 'handlebars';

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
  return compile(rawContent)(summary);
}

export {
  fillWithData,
  getHtml,
};
