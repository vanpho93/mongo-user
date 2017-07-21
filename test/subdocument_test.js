const assert = require('assert');
const User = require('../src/user');
const PostSchema = require('../src/post');
const mongoose = require('mongoose');

describe('Test post', () => {
    it('Create and add', (done) => {
        const user = new User({ name: 'Pho', posts: [{ title: 'Formosa' }] })
        user.save()
        .then(() => User.find({  }))
        .then(users => {
            assert(users[0].posts[0].title === 'Formosa');
        })
        .catch(err => console.log(err))
        .then(() => done());
    });

    it('Can add new post to a user', done => {
        const joe = new User({ name: 'Joe', post: [] });
        joe.save()
        .then(() => User.findOne({ name: 'Joe' }))
        .then(user => {
            user.posts.push({ title: 'Hahaha' })
            return user.save();
        })
        .then(() => User.findOne({ name: 'Joe' }))
        .then(user => {
            assert(user.posts[0].title === 'Hahaha');
            done();
        })
        .catch(() => assert(false));
    });

    it('Can remove a post', done => {
        const joe = new User({ name: 'Joe', posts: [{ title: 'New title' }] });
        joe.save()
        .then(() => User.findOne({ name: 'Joe' }))
        .then(user => {
            const post = user.posts[0];
            post.remove();
            return user.save();
        })
        .then(() => User.findOne({ name: 'Joe' }))
        .then(user => {
            assert(user.posts.length === 0);
            done();
        });
    });
});
 