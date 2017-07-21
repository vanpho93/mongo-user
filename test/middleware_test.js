const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
    
    let joe, blogPost;

    beforeEach(done => {
        joe = new User({ name: 'Joe', blogPosts: [] });
        blogPost = new BlogPost({
            title: 'JS is greate',
            content: 'Typescript is much better',
        });
        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
        .then(() => done());
    });

    it('Remove a user to remove his posts', done => {
        joe.remove()
        .then(() => BlogPost.count())
        .then(count => {
            assert(count === 0);
            done();
        })
    });
});
 