const assert = require('assert');
const User = require('../src/user');

describe('Reading Users test', () => {
    let joe, maria, jack, alex; 
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        jack = new User({ name: 'Jack' });
        alex = new User({ name: 'Alex' });
        Promise.all([joe.save(), maria.save(), jack.save(), alex.save()])
        .then(() => done());
    });

    it('Find all user with name Joe', (done) => {
        User.find({ name: 'Joe' })
        .then(users => {
            assert(users[0]._id.toString() === joe._id.toString());
            done();
        })
        .catch(err => {
            console.log(err);
            assert(false);
            done();
        });
    });

    it('Find an use with name Joe', (done) => {
        User.findOne({ name: 'Joe' })
        .then(user => {
            assert(user._id.toString() === joe._id.toString());
            done();
        });
    });

    it('Find an use with _id', (done) => {
        User.findOne({ _id: joe._id })
        .then(user => {
            assert(user.name === joe.name);
            done();
        })
    });

    it('Can skip some record and limit', done => {
        User.find({  }).skip(1).limit(2).sort({ name: 1 })
        .then(users => {
            assert(users.length === 2);
            assert(users[0].name === 'Jack');
            assert(users[1].name === 'Joe');
            done();
        });
    });
});
