const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: {type: String, required: true},
    blog: {type: mongoose.SchemaTypes.ObjectId, ref: 'blogs', required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'users', required: true}
},
    {timestamps: true}
);

module.exports = mongoose.model('comment', commentSchema , 'comments');