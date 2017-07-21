const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
    
    let joe, blogPost, comment;

    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({
            title: 'JS is greate',
            content: 'Typescript is much better',
            comments: []
        });
        comment = new Comment({ content: 'Good post!' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
        .then(() => done());
    });

    it('Saves a relation between a user and a blog post', done => {
        User.findOne({ name: 'Joe' })
        .populate('blogPosts')
        .then(user => {
            assert(user.blogPosts[0].title === 'JS is greate');
            done();
        });
    });

    it('Relational between collections really exist', done => {
        User.findOne({ name: 'Joe' })
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        })
        .then(user => {
            const { name } = user;
            const { title } = user.blogPosts[0];
            const commentContent = user.blogPosts[0].comments[0].content;

            assert(name === 'Joe');
            assert(title === 'JS is greate');
            assert(commentContent === 'Good post!');
            done();
        });
    });
});
 