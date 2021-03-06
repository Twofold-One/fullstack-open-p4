import config from './utils/config';
import express from 'express';
import 'express-async-errors';
const app = express();
import cors from 'cors';
import blogsRouter from './controllers/blogsRouter';
import usersRouter from './controllers/usersRouter';
import loginRouter from './controllers/login';
import middleware from './utils/middleware';
import logger from './utils/logger';
import mongoose from 'mongoose';

logger.info('connecting to', config.MONGODB_URI);
const url = config.MONGODB_URI ? config.MONGODB_URI : '';
mongoose
    .connect(url)
    .then(() => {
        logger.info('connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
