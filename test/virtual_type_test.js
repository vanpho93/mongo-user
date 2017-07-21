const assert = require('assert');
const User = require('../src/user');

describe('Test virtual type', () => {
    it('postCount return number of posts', done => {
        const joe = new User({ 
            name: 'Joe', 
            posts: [{ title: 'New title' }] 
        });
        joe.save()
        .then(() => User.findOne({  }))
        .then(user => {
            assert(user.postCount === 1);
            done();
        });
    });
});
