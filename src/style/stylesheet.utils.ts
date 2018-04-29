import * as path from 'path';
import * as fs from 'fs';

const STYLESHEET_PATH = 'build/style/etiquetaEnergetica.css';

/**
 * Reads and returns it as string.
 * @returns {string}
 */
function renderStylesheet() {
  return fs.readFileSync(path.resolve(process.cwd(), STYLESHEET_PATH), 'utf-8');
}

export { renderStylesheet };