import functionsForTesting from '../utils/for_testing';

describe('palindrome', () => {
    test('of a', () => {
        const result = functionsForTesting.palindrome('a');

        expect(result).toBe('a');
    });

    test('of react', () => {
        const result = functionsForTesting.palindrome('react');

        expect(result).toBe('tcaer');
    });

    test('of releveler', () => {
        const result = functionsForTesting.palindrome('releveler');

        expect(result).toBe('releveler');
    });
});
