import functionsForTesting from '../utils/for_testing';

describe('average', () => {
    test('of one value is the value itself', () => {
        expect(functionsForTesting.average([1])).toBe(1);
    });

    test('of many is calculated right', () => {
        expect(functionsForTesting.average([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });

    test('of empty array is zero', () => {
        expect(functionsForTesting.average([])).toBe(0);
    });
});
