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
  constructor() {
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
