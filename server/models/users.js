const mongoose = require('mongoose');

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaUser = new Schema({
    name: String,
    email : String,
    password: String,
    todos:[{ type: Schema.Types.ObjectId, ref: 'Todo' }]
},{
    timestamps:true
});

const User = mongoose.model('User', schemaUser);

module.exports = User