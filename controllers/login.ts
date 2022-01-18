/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import express from 'express';
const loginRouter = express.Router();
import User from '../models/user';

loginRouter.post('/', async (req, res) => {
    const body = await req.body;

    const user = await User.findOne({ username: body.username });
    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'invalid username or password',
        });
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    };

    const processSecret = process.env.SECRET;

    if (!processSecret) {
        return res.status(500).json({
            error: 'no secret',
        });
    }

    const token = jwt.sign(userForToken, processSecret, { expiresIn: 60 * 60 });
    return res.status(200).send({
        token,
        username: user.username,
        name: user.name,
    });
});

export default loginRouter;
