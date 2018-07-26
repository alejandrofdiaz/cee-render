import { SummaryCertificado } from '../model';

describe('Summary Certificado Model Testing', () => {
  const _Summary = new SummaryCertificado();

  _Summary.fecha = '26/07/2018';
  test('Should return correct validity date', () => {
    const _Summary2 = new SummaryCertificado();
    expect(_Summary.setFechaValidez()).toBe('26/7/2028');
    expect(_Summary2.setFechaValidez()).toBeFalsy();
  });
});
