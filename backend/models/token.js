const mongoose = require('mongoose');
const { Schema } = mongoose;

const refreshTokenSchema = Schema({
    token: {type: String, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
},
    {timestamps: true}
);

module.exports = mongoose.model('RefreshToken', refreshTokenSchema , 'tokens');
                            //  Model Name    , Schema Name        ,  database ki collection ka naam jo baneyga