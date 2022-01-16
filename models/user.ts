/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { User } from '../types';

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        minlength: 3,
        unique: true,
    },
    name: String,
    passwordHash: {
        type: String,
        minlength: 3,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog',
        },
    ],
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

const User = mongoose.model('User', userSchema);

export default User;
