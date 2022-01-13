const palindrome = (str: string): string => {
    return str.split('').reverse().join('');
};

const average = (arr: number[]): number => {
    const reducer = (sum: number, item: number) => {
        return sum + item;
    };

    return arr.length === 0 ? 0 : arr.reduce(reducer, 0) / arr.length;
};

export default {
    palindrome,
    average,
};
