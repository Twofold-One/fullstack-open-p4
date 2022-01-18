import mongoose from 'mongoose';

export interface Blog {
    title: string;
    author: string;
    url: string;
    likes: number;
}

export interface BlogM extends Document {
    title: string;
    author: string;
    url: string;
    likes: number;
    user: {
        type: typeof mongoose.Schema.Types.ObjectId;
        ref: string;
    };
}

export interface User extends Document {
    username: string;
    name: string;
    passwordHash: string;
    blogs: string[];
}
