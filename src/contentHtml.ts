import * as fs from 'fs';
import * as path from 'path';

const HTML_PATH = 'etiquetaEn.html';

const getHtml = () => fs.readFileSync(path.resolve(__dirname, HTML_PATH), { encoding: 'utf8' });

/**
 * Given a summaryCertificado object like class, fills
 * a string like html with its data. So render could
 * @param {SummaryCertificado} summary
 * @returns {string} htmlStringlike filled with data
 */
function fillWithData(summary) {
  let rawContent = getHtml();
  let finalContent = Object.keys(summary).reduce(
    (prev, key) => prev.replace(`{{${key}}}`, summary[key]),
    rawContent
  );
  return finalContent;
}

export { fillWithData };
