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
    } else {
        return;
    }
    next();
};

export default {
    requestLogger,
    unknownEndpoint,
    errorHandler,
};
