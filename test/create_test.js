const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('save an user', (done) => {
        const pho = new User({ name: 'Pho Nguyen' });
        pho.save()
        .then(() => {
            assert(!pho.isNew);
            done();
        });
    })
});
