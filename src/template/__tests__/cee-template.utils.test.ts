import { getHtml } from '../cee-template.utils';

describe('cee-template util test', () => {


  test('Load Html Template', () => {
    expect(!!getHtml()).toBeTruthy();
  });

  /**
   * 
   * DEPRECATED TESTS
   * 
   */

  // test('Default replacing', () => {
  //   const rawHtml = 'my name is {{name}} and i would like to render this {{thing}}';
  //   const testObject = { name: 'Alejandro', thing: 'html' };

  //   expect(renderString(rawHtml, testObject)).toBe(
  //     'my name is Alejandro and i would like to render this html'
  //   );
  // });

  // test('Remove Missing Attributes', () => {
  //   const rawHtml = 'this is a {{test}}';
  //   expect(removeSpareBraces(rawHtml)).toBe('this is a ');
  // });

  // test('Remove empty tags', () => {
  //   const stringTest = 'alalalala';
  //   const resultTest = 'llll';
  //   expect(removeEmptyTags(stringTest, 'a')).toBe(resultTest);
  // });
});
