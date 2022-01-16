/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import app from '../app';
const api = supertest(app);
import User from '../models/user';
// import { User as UserType } from '../types';
import helper from './test_helper';

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash('secret', 10);
        const user = new User({
            username: 'root',
            name: 'root',
            passwordHash,
        });

        await user.save();
    });

    test('creation succeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'evan',
            name: 'evan geras',
            password: 'test',
        };

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    });

    test('creation fails with proper statuscode and message if username already have been taken', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'superpassword',
        };

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(result.body.error).toContain('`username` to be unique');

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});
