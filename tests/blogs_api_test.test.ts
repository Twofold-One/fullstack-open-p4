/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
const api = supertest(app);
import { Blog as BlogType } from '../types';
import Blog from '../models/blog';
import helper from './test_helper';

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.InitialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
});

describe('when there is iniially blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('all blogs returned', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(helper.InitialBlogs.length);
    });

    test('specific blog is in the returned blogs', async () => {
        const response = await api.get('/api/blogs');
        const content = response.body.map((b: { author: string }) => b.author);
        expect(content).toContain('Person Test 2');
    });
    test('returns blog by id', async () => {
        const blogs = await helper.blogsInDb();
        const blogToReturn = blogs[0];
        const blogToReturnId = blogToReturn.id;

        const response = await api.get(`/api/blogs/${blogToReturnId}`);
        expect(response.body).toEqual(blogToReturn);
    });
});

describe('addition of blog', () => {
    test('a valid blog can be added', async () => {
        const newBlog: BlogType = {
            title: 'Async/await',
            author: 'Async Person',
            url: 'dev.to',
            likes: 50,
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length + 1);

        const content = blogsAtEnd.map((b) => b.title);
        expect(content).toContain('Async/await');
    });

    test('fails with status code 400 if data is invalid', async () => {
        const newBlog = {
            title: 'empty',
        };

        await api.post('/api/blogs').send(newBlog).expect(400);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length);
    });
});

describe('delete blog', () => {
    test('blog is actually deleted', async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[2];
        const blogToDeleteId = blogToDelete.id;

        await api.delete(`/api/blogs/${blogToDeleteId}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    });
});

describe('update blog', () => {
    test('blog likes count is updated', async () => {
        const blogs = await helper.blogsInDb();
        const blogToUpdate = blogs[3];
        const blogToUpdateId = blogToUpdate.id;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await api.put(`/api/blogs/${blogToUpdateId}`).send({
            ...blogToUpdate,
            likes: blogToUpdate.likes + 10,
        });
        const blogsAfterUpdate = await helper.blogsInDb();
        const updatedBlog = blogsAfterUpdate[3];
        expect(updatedBlog.likes).toBe(blogToUpdate.likes + 10);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
