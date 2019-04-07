const mongoose = require('mongoose');

const Todo = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required field']
        },
        done: {
            type: Boolean
        },
        user:{
            type:String,
            required: [true, 'user is required field']
        }
    },
    { collection: 'todos' }
);

module.exports = mongoose.model('todo', Todo);
