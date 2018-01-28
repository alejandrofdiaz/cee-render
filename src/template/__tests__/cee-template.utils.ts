import { renderString, removeSpareBraces } from '../cee-template.utils';

describe('cee-template util test', () => {
  test('Default replacing', () => {
    const rawHtml = 'my name is {{name}} and i would like to render this {{thing}}';
    const testObject = { name: 'Alejandro', thing: 'html' };

    expect(renderString(rawHtml, testObject)).toBe(
      'my name is Alejandro and i would like to render this html'
    );
  });

  test('Remove Missing Attributes', () => {
    const rawHtml = 'this is a {{test}}';
    expect(removeSpareBraces(rawHtml)).toBe('this is a ');
  });
});
