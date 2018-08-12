const mongoose = require('mongoose');
 
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const schemaTodo = new Schema({
    todo: String,
    deadLine : Date,
    progress: { type: String, default: 'uncomplete' },
    status: String
},{
    timestamps:true
});

const Todo = mongoose.model('Todo', schemaTodo);

module.exports = Todo