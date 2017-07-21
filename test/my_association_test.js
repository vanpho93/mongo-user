const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Review association test', () => {
    let joe, comment, blogPost;

    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'Review MongoDB', content: 'Is it hard? No, it is very easy!' });
        comment = new Comment({ content: 'Hmmm, I think so.' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
        const savePromises = [joe.save(), blogPost.save(), comment.save()];
        Promise.all(savePromises)
        .then(() => done());
    });

    it('User is association with blogPost', done => {
        User.findOne({ name: 'Joe' })
            .populate('blogPosts')
            .then(user => {
                assert(user.blogPosts[0].title === 'Review MongoDB');
                done();
            })
    });

    it('Every thing is associated', done => {
        User.findOne({ name: 'Joe' })
        .populate('blogPosts')
        .then(user => {
            assert(user.blogPosts[0]._id.toString() === blogPost._id.toString());
            done();
        });
    });

    it('Full relational tree works', done => {
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
            assert(user.blogPosts[0]._id.toString() === blogPost._id.toString());
            assert(user.blogPosts[0]._id.toString() === blogPost._id.toString());
            assert(user.blogPosts[0].comments[0]._id.toString() === comment._id.toString());
            assert(user.blogPosts[0].comments[0].user._id.toString() === user._id.toString());
            done();
        });
    });
});
