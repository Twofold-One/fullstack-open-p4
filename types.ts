export interface Blog {
    title: string;
    author: string;
    url: string;
    likes: number;
}

export interface User extends Document {
    username: string;
    name: string;
    passwordHash: string;
    blogs: string[];
}
