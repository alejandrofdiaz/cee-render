import Suma from '../index';

describe('Test general', () => {
    beforeEach(() => {
        console.log('cosas antes del test');
    });

    test('adds 1 + 2 to equal 3', () => {
        expect(Suma(1, 2)).toBe(3);
    });

    test('test failed', () => {
        expect(Suma(1, 3)).not.toBe(2);
    });
});
