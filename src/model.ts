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
  setRegistro(value: string) {
    this.registro = value;
  }

  generateResumen() {
    this.datosEdificio = `
		  Construccion - ${this.anio}
		  ${this.normativa}
		  `;
  }
}

export { SummaryCertificado };
