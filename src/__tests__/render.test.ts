import { replaceStyle } from '../render';

describe('Render Test', () => {
  test('Render HTML correctly', () => {
    const mockHtml = `<body><head></head></body>`;
    const mockStyle = `.test{color:black;}`;

    expect(replaceStyle(mockHtml, mockStyle)).toBe(
      '<body><head><style>.test{color:black;}</style></head></body>'
    );
  });
});
