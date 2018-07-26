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
  let _xmlFullTree = xml2js(xml, {
    compact: true,
    trim: true,
    ignoreDeclaration: true,
    ignoreDoctype: true,
    ignoreAttributes: true
  });
  const _xmlDataTree = _xmlFullTree.DatosEnergeticosDelEdificio
    ? _xmlFullTree.DatosEnergeticosDelEdificio
    : null;
  const summary = new SummaryCertificado();

  if (!!_xmlDataTree) {
    try {
      summary.anio = _xmlDataTree.IdentificacionEdificio.AnoConstruccion._text;
    } catch (err) {
      console.log('error anio');
    }

    try {
      summary.normativa = _xmlDataTree.IdentificacionEdificio.NormativaVigente._text;
    } catch (err) {
      console.log('error normativa');
    }

    try {
      summary.referenciaCatastral = _xmlDataTree.IdentificacionEdificio.ReferenciaCatastral._text;
    } catch (err) {
      console.log('error referenciaCatastral');
    }

    try {
      summary.tipoEdificio = _xmlDataTree.IdentificacionEdificio.TipoDeEdificio._text;
      summary.tipoEdificio = summary.tipoEdificio
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    } catch (err) {
      console.log('error tipoEdificio');
    }

    try {
      summary.direccion = _xmlDataTree.IdentificacionEdificio.Direccion._text;
    } catch (err) {
      console.log('error direccion');
    }

    try {
      summary.municipio = _xmlDataTree.IdentificacionEdificio.Municipio._text;
    } catch (err) {
      console.log('error municipio');
    }

    try {
      summary.cp = _xmlDataTree.IdentificacionEdificio.CodigoPostal._text;
    } catch (err) {
      console.log('error cp');
    }

    try {
      summary.comunidadAutonoma = _xmlDataTree.IdentificacionEdificio.ComunidadAutonoma._text;
    } catch (err) {
      console.log('error comunidadAutonoma');
    }

    try {
      summary.fecha = _xmlDataTree.DatosDelCertificador.Fecha._text;
      summary.setFechaValidez();
    } catch (err) {
      console.log('error fecha');
    }

    try {
      summary.consumoEnergia = _xmlDataTree.Consumo.EnergiaPrimariaNoRenovable.Global._text;
      summary.consumoEnergia = String(Math.floor(Number(summary.consumoEnergia)));
    } catch (err) {
      console.log('error consumoEnergia');
    }

    try {
      summary.calificacionConsumoEnergia =
        _xmlDataTree.Calificacion.EnergiaPrimariaNoRenovable.Global._text;
    } catch (err) {
      console.log('error letraEnergia');
    }

    try {
      summary.emisionesCO2 = _xmlDataTree.EmisionesCO2.Global._text;
    } catch (err) {
      console.log('error emisionesCO2');
    }

    try {
      summary.calificacionEmisiones = _xmlDataTree.Calificacion.EmisionesCO2.Global._text;
    } catch (err) {
      console.log('error letra consumo energia');
    }

    summary.generateResumen();
    summary.setCalificacionSelectableValues();
  }

  return summary;
}

export default parseDataFromSummary;
