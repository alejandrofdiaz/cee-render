import { xml2js } from 'xml-js';
import { SummaryCertificado } from './model';

/**
 * Takes xml in string format and retrieves a parsed SummaryCertificado class like
 * to feed render method.
 *
 * @param {string} xml
 * @returns {SummaryCertificado}
 */
function parseDataFromSummary(xml: string) {
  let _xmlFullTree = xml2js(xml);
  const _xmlDataTree = _xmlFullTree.elements ? _xmlFullTree.elements[0] : null;
  const summary = new SummaryCertificado();

  if (_xmlDataTree && _xmlDataTree.name === 'DatosEnergeticosDelEdificio') {
    try {
      summary.anio = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'AnoConstruccion').elements[0].text;
    } catch (err) {
      console.log('error anio');
    }

    try {
      summary.normativa = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'NormativaVigente').elements[0].text;
    } catch (err) {
      console.log('error normativa');
    }

    try {
      summary.referenciaCatastral = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'ReferenciaCatastral').elements[0].text;
    } catch (err) {
      console.log('error referenciaCatastral');
    }

    try {
      summary.tipoEdificio = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'TipoDeEdificio').elements[0].text;

      summary.tipoEdificio = summary.tipoEdificio
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    } catch (err) {
      console.log('error tipoEdificio');
    }

    try {
      summary.direccion = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'Direccion').elements[0].text;
    } catch (err) {
      console.log('error direccion');
    }

    try {
      summary.municipio = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'Municipio').elements[0].text;
    } catch (err) {
      console.log('error municipio');
    }

    try {
      summary.cp = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'CodigoPostal').elements[0].text;
    } catch (err) {
      console.log('error cp');
    }
    try {
      summary.comunidadAutonoma = _xmlDataTree.elements
        .find(item => item.name === 'IdentificacionEdificio')
        .elements.find(item => item.name === 'ComunidadAutonoma').elements[0].text;
    } catch (err) {
      console.log('error comunidadAutonoma');
    }
    try {
      summary.fecha = _xmlDataTree.elements
        .find(item => item.name === 'DatosDelCertificador')
        .elements.find(item => item.name === 'Fecha').elements[0].text;
    } catch (err) {
      console.log('error fecha');
    }

    try {
      summary.consumoEnergia = _xmlDataTree.elements
        .find(item => item.name === 'Consumo')
        .elements.find(item => item.name === 'EnergiaPrimariaNoRenovable')
        .elements.find(item => item.name === 'Global').elements[0].text;

      summary.consumoEnergia = String(Math.floor(Number(summary.consumoEnergia)));
    } catch (err) {
      console.log('error consumoEnergia');
    }

    try {
      summary.calificacionConsumoEnergia = _xmlDataTree.elements
        .find(item => item.name === 'Calificacion')
        .elements.find(item => item.name === 'EnergiaPrimariaNoRenovable')
        .elements.find(item => item.name === 'Global').elements[0].text;
    } catch (err) {
      console.log('error letraEnergia');
    }

    try {
      summary.emisionesCO2 = _xmlDataTree.elements
        .find(item => item.name === 'EmisionesCO2')
        .elements.find(item => item.name === 'Global').elements[0].text;
      summary.emisionesCO2 = String(Math.floor(Number(summary.emisionesCO2)));
    } catch (err) {
      console.log('error emisionesCO2');
    }

    try {
      summary.calificacionEmisiones = _xmlDataTree.elements
        .find(item => item.name === 'Calificacion')
        .elements.find(item => item.name === 'EmisionesCO2')
        .elements.find(item => item.name === 'Global').elements[0].text;
    } catch (err) {
      console.log('error letra consumo energia');
    }

    summary.generateResumen();
    summary.setCalificacionSelectableValues();
  }
  return summary;
}

export default parseDataFromSummary;
