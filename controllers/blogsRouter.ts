/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
const blogsRouter = express.Router();
import Blog from '../models/blog';
import User from '../models/user';
import jwt from 'jsonwebtoken';

blogsRouter.get('/', async (_req, res) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
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

const getTokenFrom = (req: express.Request) => {
    const authorization = req.get('authorization');
    if (
        authorization &&
        authorization.toLocaleLowerCase().startsWith('bearer ')
    ) {
        return authorization.substring(7);
    }
    return null;
};

blogsRouter.post('/', async (req, res) => {
    const body = req.body;

    const token = getTokenFrom(req);
    const processSecret = process.env.SECRET;

    if (!(token && processSecret)) {
        return res.send(500).json({
            error: 'null token or no secret',
        });
    }
    const decodedToken: any = jwt.verify(token, processSecret);
    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user ? user._id : 'unknown',
    });

    const savedBlog = await blog.save();
    user ? (user.blogs = user.blogs.concat(savedBlog._id)) : null;
    user ? await user.save() : null;
    return res.json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res) => {
    const token = getTokenFrom(req);
    const processSecret = process.env.SECRET;

    if (!(token && processSecret)) {
        return res.send(500).json({
            error: 'null token or no secret',
        });
    }
    const decodedToken: any = jwt.verify(token, processSecret);

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = await Blog.findById(req.params.id);

    if (!(blog && user)) {
        return res.status(500).json({
            error: 'no blog or user',
        });
    } else {
        if (!(blog.user.toString() === user._id.toString())) {
            return res.status(500).json({
                error: 'no user with such id',
            });
        }
    }
    // TODO: make deleted blog be removed from useres blogs
    await Blog.findByIdAndDelete(req.params.id);
    return res.status(204).end();
});

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body;

    const blog = {
        ...body,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
        new: true,
    });
    res.json(updatedBlog);
});

export default blogsRouter;
