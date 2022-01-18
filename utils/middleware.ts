import logger from './logger';
import express, { NextFunction } from 'express';

const requestLogger = (
    req: express.Request,
    _res: express.Response,
    next: NextFunction
) => {
    logger.info('Method:', req.method);
    logger.info('Path:', req.path);
    logger.info('Body:', req.body);
    logger.info('---');
    next();
};

const unknownEndpoint = (_req: express.Request, res: express.Response) => {
    res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (
    error: Error,
    _req: express.Request,
    res: express.Response,
    next: NextFunction
) => {
    logger.error(error.message);

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token',
        });
    } else if (error.name === 'TokenExpiredError') {
        return res.status(404).json({
            error: 'token expired',
        });
    }
    return next(error);
};

// const tokenExtractor = (
//     req: express.Request,
//     _res: express.Response,
//     next: NextFunction
// ) => {
//     const authorization = req.get('authorization');
//     logger.info(`authorization is: ${authorization}`);
//     if (
//         authorization &&
//         authorization.toLocaleLowerCase().startsWith('bearer ')
//     ) {
//         const token = authorization.substring(7);
//         logger.info(`token is: ${token}`);
//         req.token = token;
//         return token;
//     }
//     return next();
// };

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};
