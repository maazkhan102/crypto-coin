const mongoose = require('mongoose');
const { Schema } = mongoose;
const blogSchema = new Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    photoPath: {type: String, required: true},
    author: {type: mongoose.SchemaTypes.ObjectId, ref: 'users', required: true}
},
    {timestamps: true}
);

module.exports = mongoose.model('blogs', blogSchema , 'blogs');