/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Blog from '../models/blog';
import { Blog as BlogType } from '../types';

const InitialBlogs: BlogType[] = [
    {
        title: 'Dev Blog Test',
        author: 'Person Test',
        url: 'dev.to',
        likes: 15,
    },
    {
        title: 'Dev Blog Test 2',
        author: 'Person Test 2',
        url: 'dev.to',
        likes: 15,
    },
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'willremovethis',
        author: 'willremovethis',
        url: 'willremovethis',
        likes: 0,
    });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

export default {
    InitialBlogs,
    nonExistingId,
    blogsInDb,
};