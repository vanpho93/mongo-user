const mongoose = require('mongoose');
//1. How to create a Schema
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    //How to reference to another collection
    user: { type: Schema.Types.ObjectId, ref: 'user' }
});

//Create class and exports
const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
