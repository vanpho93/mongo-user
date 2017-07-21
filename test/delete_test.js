const assert = require('assert');

const User = require('../src/user');

describe('Delete an user', () => {
    let joe;

    beforeEach(done => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => done());
    });

    it('Delete by instance method', done => {
        joe.remove()
        .then(() => User.findOne({ _id: joe._id }))
        .then(user => {;
            assert(user === null);
            done();
        });
    });

    it('Delete by class method', done => {
        User.remove({ name: 'Joe' })
        .then(() => User.findOne({ _id: joe._id }))
        .then(user => {
            assert(user === null);
            done();
        });
    });

    it('Class remove method', done => {
        User.remove({ name: 'Joe' })
        .then(() => User.findOne({ _id: joe._id }))
        .then(user => {
                assert(user === null);
                done();
        });
    });

    it('Class findOne and remove', done => {
        User.findOneAndRemove({ name: 'Joe' })
        .then(() => User.findOne({ _id: joe._id }))
        .then(user => {
                assert(user === null);
                done();
        });
    });

    it('Class findOne and remove', done => {
        User.findByIdAndRemove(joe._id)
        .then(() => User.findOne({ _id: joe._id }))
        .then(user => {
                assert(user === null);
                done();
        });
    });
});