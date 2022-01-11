import express from 'express';
const blogsRouter = express.Router();
import Blog from '../models/blog';

blogsRouter.get('/', (_req, res) => {
    Blog.find({}).then((blogs) => {
        res.send(blogs);
    });
});

blogsRouter.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save().then((result: unknown) => {
        res.status(201).json(result);
    });
});

export default blogsRouter;
