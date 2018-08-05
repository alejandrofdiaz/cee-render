import StylesheetService from '../stylesheet.utils';

describe.only('Stylesheet correctly loader', () => {
  test('renderStylesheet', () => {
    expect(StylesheetService.getStylesheet()).toBeTruthy();
    expect(StylesheetService.getStylesheet().length).toBeGreaterThan(0);
    expect(typeof StylesheetService.getStylesheet()).toBe('string');
  });
});
