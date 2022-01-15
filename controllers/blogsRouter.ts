/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const blogsRouter = express.Router();
import Blog from '../models/blog';

blogsRouter.get('/', async (_req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
});

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
    }
});

blogsRouter.post('/', async (req, res) => {
    const blog = new Blog(req.body);

    const savedBlog = await blog.save();
    res.json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const blog = {
        ...body,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
        new: true,
    });
    res.json(updatedBlog);
});

export default blogsRouter;
