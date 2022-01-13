/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const blogsRouter = express.Router();
import Blog from '../models/blog';

blogsRouter.get('/', async (_req, res, next) => {
    try {
        const blogs = await Blog.find({});
        res.json(blogs);
    } catch (exeption) {
        next(exeption);
    }

    // Blog.find({}).then((blogs) => {
    //     res.send(blogs);
    // });
});

blogsRouter.post('/', async (req, res, next) => {
    const blog = new Blog(req.body);
    try {
        const savedBlog = await blog.save();
        res.json(savedBlog);
    } catch (exeption) {
        next(exeption);
    }

    // blog.save().then((result: unknown) => {
    //     res.status(201).json(result);
    // });
});

export default blogsRouter;
