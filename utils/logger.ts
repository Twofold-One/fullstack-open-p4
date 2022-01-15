/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
const info = (...params: any) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

const error = (...params: any) => {
    if (process.env.NODE_ENV !== 'test') {
        console.log(...params);
    }
};

export default {
    info,
    error,
};
