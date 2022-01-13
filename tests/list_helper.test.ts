import listHelper from '../utils/list_helper';
import { Blog } from '../types';

test('dummy returns one', () => {
    const blogs: Blog[] = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('total likes', () => {
    const listWithOneBlog: Blog[] = [
        {
            title: 'Jest Tester',
            author: 'Jester',
            url: 'some http://...',
            likes: 10,
        },
    ];
    const listWithFewBlogs: Blog[] = [
        {
            title: 'Jest Tester',
            author: 'Jester',
            url: 'some http://...',
            likes: 10,
        },
        {
            title: 'Jest Tester 2',
            author: 'Jester 2',
            url: 'some http://...',
            likes: 10,
        },
    ];

    test('when list has only one blog, equals the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(10);
    });

    test('of a bigger list is calculated rigth', () => {
        const result = listHelper.totalLikes(listWithFewBlogs);
        expect(result).toBe(20);
    });
});

describe('favorite blog', () => {
    const listWithOneBlog: Blog[] = [
        {
            title: 'Jest Tester',
            author: 'Jester',
            url: 'some http://...',
            likes: 10,
        },
    ];

    const listWithFewBlogs: Blog[] = [
        {
            title: 'Jest Tester',
            author: 'Jester',
            url: 'some http://...',
            likes: 10,
        },
        {
            title: 'Jest Tester 2',
            author: 'Jester 2',
            url: 'some http://...',
            likes: 20,
        },
        {
            title: 'Jest Tester 3',
            author: 'Jester 3',
            url: 'some http://...',
            likes: 30,
        },
    ];
    const listWithFewBlogsWithSameResult: Blog[] = [
        {
            title: 'Jest Tester',
            author: 'Jester',
            url: 'some http://...',
            likes: 10,
        },
        {
            title: 'Jest Tester 2',
            author: 'Jester 2',
            url: 'some http://...',
            likes: 20,
        },
        {
            title: 'Jest Tester 3',
            author: 'Jester 3',
            url: 'some http://...',
            likes: 20,
        },
    ];

    test('if only one blog, returns it', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual(listWithOneBlog[0]);
    });
    test('returns correct blog', () => {
        const result = listHelper.favoriteBlog(listWithFewBlogs);
        expect(result).toEqual(listWithFewBlogs[2]);
    });
    test('returns few blogs with maximum likes', () => {
        const result = listHelper.favoriteBlog(listWithFewBlogsWithSameResult);
        expect(result).toEqual(
            (listWithFewBlogsWithSameResult[1],
            listWithFewBlogsWithSameResult[2])
        );
    });
});
