const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/users_test');

mongoose.connection
.once('open', () => console.log('Ready'))
.on('error', err => console.log(err));

beforeEach((done) => {
    const { users, blogposts, comments } = mongoose.connection.collections;
    Promise.all([
        users.drop().catch(_ => _), 
        comments.drop().catch(_ => _), 
        blogposts.drop().catch(_ => _)
    ])
    .then(() => done());
    // users.drop(() => {
    //     comments.drop(() => {
    //         blogposts.drop(() => {
    //             done();
    //         });
    //     });
    // });
    // console.log(mongoose.connection.collections);
});
