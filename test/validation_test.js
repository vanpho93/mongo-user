const assert = require('assert');
const User = require('../src/user');

describe('Validation records', () => {
    it('Requires a user name', done => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        assert(validationResult.errors.name.message === 'Name is required');
        done();
    });

    it('Requires a user name', done => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        assert(validationResult.errors.name.message === 'Name must be longer than 2 character');
        done();
    });
});
