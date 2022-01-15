import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';

const api = supertest(app);

beforeAll((done) => {
    done();
});

afterAll((done) => {
    void mongoose.connection.close();
    done();
});

test('blogs are returned json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});
