import { Blog } from '../types';
const dummy = (_blogs: Blog[]) => {
    return 1;
};

const totalLikes = (blogs: Blog[]): number => {
    return blogs.reduce((prev, current) => {
        return prev + current.likes;
    }, 0);
};

const favoriteBlog = (blogs: Blog[]): Blog => {
    return blogs.reduce((prev, current) => {
        return prev.likes > current.likes ? prev : current;
    });
};

export default { dummy, totalLikes, favoriteBlog };
