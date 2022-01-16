/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Blog from '../models/blog';
import User from '../models/user';
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
    {
        title: 'Dev Blog Delete Test',
        author: 'Person Delete',
        url: 'dev.to',
        likes: 10,
    },
    {
        title: 'Dev Blog Update Test',
        author: 'Person Update Test',
        url: 'dev.to',
        likes: 10,
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

const usersInDb = async () => {
    const users = await User.find({});
    return users.map((user) => user.toJSON());
};

export default {
    InitialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
};
