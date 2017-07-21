const assert = require('assert');

const User = require('../src/user');

describe('Updating users', () => {

    let joe;

    beforeEach(done => {
        joe = new User({ name: 'Joe', postCount: 0 });
        joe.save()
        .then(() => done());
    });

    it('Updating using instance set and save', done => {
        joe.set('name', 'Alex');
        assertName(joe.save(), done);
    });

    it('Update by instance method', done => {
        assertName(joe.update({ name: 'Alex' }), done);
    });

    it('A model class can update', done => {
        const operation = User.update({ name: 'Joe' }, { name: 'Alex' });
        assertName(operation, done);
    });

    it('A model class can find one and update', done => {
        const operation = User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' });
        assertName(operation, done);
    });
 
    it('A model class can find by Id and update', done => {
        const operation = User.findByIdAndUpdate(joe._id, { name: 'Alex' });
        assertName(operation, done);
    });

    xit('Can increment the post count', done => {
        User.update({ name: 'Joe' }, { $inc: { postCount: 1 } })
        .then(() => User.findOne({ name: 'Joe' }))
        .then(user => {
            assert(user.postCount === 1);
            done();
        });
    });
});

function assertName(operation, done) {
    operation
    .then(() => User.find({  }))
    .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
    });
}
