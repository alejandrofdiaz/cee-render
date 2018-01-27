import { renderSync } from 'node-sass';
import * as path from 'path';

const STYLESHEET_PATH = '_etiquetaEnergetica.scss';

/**
 * Renders stylesheets and returns it as string.
 * @returns {string}
 */
function renderStylesheet() {
  const result = renderSync({
    file: path.resolve(__dirname, STYLESHEET_PATH),
    outputStyle: 'compressed'
  });
  return result.css.toString();
}

export default renderStylesheet;
