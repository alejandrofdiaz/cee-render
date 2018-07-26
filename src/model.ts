const DEFAULT_VALIDITY_OFFSET = 10; //Years

class SummaryCertificado {
  anio: string;
  calificacionEmisiones: string;
  calificacionConsumoEnergia: string;
  comunidadAutonoma: string;
  consumoEnergia: string;
  cp: string;
  datosEdificio: string;
  direccion: string;
  emisionesCO2: string;
  fecha: string;
  municipio: string;
  normativa: string;
  referenciaCatastral: string;
  registro: string;
  tipoEdificio: string;
  _validityYears: number;
  fechaValidez: string;
  constructor(validity = DEFAULT_VALIDITY_OFFSET) {
    this._validityYears = validity;
    this.anio = '';
    this.calificacionEmisiones = '';
    this.calificacionConsumoEnergia = '';
    this.comunidadAutonoma = '';
    this.consumoEnergia = '';
    this.cp = '';
    this.datosEdificio = '';
    this.direccion = '';
    this.emisionesCO2 = '';
    this.fecha = '';
    this.fechaValidez = '';
    this.municipio = '';
    this.normativa = '';
    this.referenciaCatastral = ''; //referencia catastral
    this.registro = '';
    this.tipoEdificio = '';
  }

  setRegistro(value: string) {
    this.registro = value;
  }

  generateResumen() {
    this.datosEdificio = `
		  Construccion - ${this.anio}
		  ${this.normativa}
		  `;
  }

  private generateValidityDate(date: string, validity: number = DEFAULT_VALIDITY_OFFSET) {
    let [day, month, year] = date.split('/').map(value => +value);
    year = year + validity;
    month = month - 1;
    return new Date(year, month, day);
  }

  setFechaValidez() {
    if (!this.fecha) return '';
    const date = this.generateValidityDate(this.fecha, this._validityYears);
    const _dateString = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/');
    return (this.fechaValidez = _dateString);
  }

  setCalificacionSelectableValues() {
    this.calificacionEmisiones = this.calificacionEmisiones.toUpperCase();
    this.calificacionConsumoEnergia = this.calificacionConsumoEnergia.toUpperCase();
    const _idEmisiones = `emisionesCO2${this.calificacionEmisiones}`;
    const _idConsumo = `consumoEnergia${this.calificacionConsumoEnergia}`;
    this[_idEmisiones] = this.emisionesCO2;
    this[_idConsumo] = this.consumoEnergia;
  }
}

export { SummaryCertificado };
