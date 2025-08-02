const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    content: {type: String, required: true},
    blog: {type: mongoose.SchemaTypes.ObjectId, ref: 'Blog', required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true}
},
    {timestamps: true}
);

module.exports = mongoose.model('comment', commentSchema , 'comments');