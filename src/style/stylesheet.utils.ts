import * as path from 'path';
import * as fs from 'fs';

const STYLESHEET_FILENAME = 'etiquetaEnergetica.css';
const PATHS = {
  DEV: path.resolve(process.cwd(), 'build/style/' + STYLESHEET_FILENAME),
  PROD: path.resolve(__dirname, STYLESHEET_FILENAME)
};

class Stylesheet {
  styleSheet: string;
  constructor() {
    this.styleSheet = this.renderStylesheet();
  }

  getStylesheet() {
    return this.styleSheet;
  }

  reloadStylesheet() {
    this.styleSheet = this.renderStylesheet();
    return this.getStylesheet();
  }

  renderStylesheet() {
    let _styleSheet: string;
    try {
      _styleSheet = fs.readFileSync(PATHS.PROD, 'utf-8');
    } catch (err) {
      _styleSheet = fs.readFileSync(PATHS.DEV, 'utf-8');
    }

    return _styleSheet;
  }
}

const _StylesheetService = new Stylesheet();

export default _StylesheetService;
