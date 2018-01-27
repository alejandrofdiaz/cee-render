import { xml2js } from 'xml-js';

class SummaryCertificado {
  anio: string;
  normativa: string;
  referenciaCatastral: string;
  tipoEdificio: string;
  direccion: string;
  municipio: string;
  cp: string;
  comunidadAutonoma: string;
  consumoEnergia: string;
  emisionesCO2: string;
  registro: string;
  fecha: string;
  datosEdificio: string;
  constructor() {
    this.anio = '';
    this.normativa = '';
    this.referenciaCatastral = ''; //referencia catastral
    this.tipoEdificio = '';
    this.direccion = '';
    this.municipio = '';
    this.cp = '';
    this.comunidadAutonoma = '';
    this.consumoEnergia = '';
    this.emisionesCO2 = '';
    this.registro = '';
    this.fecha = '';
    // this.resumen = '';
    this.datosEdificio = '';
  }

  /**
   * @param {string} value
   * @returns {void}
   */
  setRegistro(value) {
    this.registro = value;
  }

  generateResumen() {
    this.datosEdificio = `
		Construccion - ${this.anio}
		${this.normativa}
		`;
  }
}

/**
 * Takes xml in string format and retrieves a parsed SummaryCertificado class like
 * to feed render method.
 *
 * @param {string} xml
 * @returns {SummaryCertificado}
 */
function parseDataFromSummary(xml: string) {
  const _xml = xml2js(xml).elements[0];
  const summary = new SummaryCertificado();

  if (_xml.name === 'DatosEnergeticosDelEdificio') {
    try {
      summary.anio = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'AnoConstruccion').elements[0].text;
    } catch (err) {
      console.log('error anio');
    }

    try {
      summary.normativa = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'NormativaVigente').elements[0].text;
    } catch (err) {
      console.log('error normativa');
    }

    try {
      summary.referenciaCatastral = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'ReferenciaCatastral').elements[0].text;
    } catch (err) {
      console.log('error referenciaCatastral');
    }

    try {
      summary.tipoEdificio = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'TipoDeEdificio').elements[0].text;

      summary.tipoEdificio = summary.tipoEdificio
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    } catch (err) {
      console.log('error tipoEdificio');
    }

    try {
      summary.direccion = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'Direccion').elements[0].text;
    } catch (err) {
      console.log('error direccion');
    }

    try {
      summary.municipio = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'Municipio').elements[0].text;
    } catch (err) {
      console.log('error municipio');
    }

    try {
      summary.cp = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'CodigoPostal').elements[0].text;
    } catch (err) {
      console.log('error cp');
    }
    try {
      summary.comunidadAutonoma = _xml.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'ComunidadAutonoma').elements[0].text;
    } catch (err) {
      console.log('error comunidadAutonoma');
    }
    try {
      summary.fecha = _xml.elements
        .find(item => item.name === 'DatosDelCertificador')
        .elements.find(item => item.name === 'Fecha').elements[0].text;
    } catch (err) {
      console.log('error fecha');
    }

    try {
      summary.consumoEnergia = _xml.elements
        .find(item => item.name === 'Consumo')
        .elements.find(item => item.name === 'EnergiaPrimariaNoRenovable')
        .elements.find(item => item.name === 'Global').elements[0].text;
    } catch (err) {
      console.log('error consumoEnergia');
    }

    try {
      summary.emisionesCO2 = _xml.elements
        .find(item => item.name === 'EmisionesCO2')
        .elements.find(item => item.name === 'Global').elements[0].text;
    } catch (err) {
      console.log('error emisionesCO2');
    }

    summary.generateResumen();
    return summary;
  } else {
    return null;
  }
}

export default parseDataFromSummary;
