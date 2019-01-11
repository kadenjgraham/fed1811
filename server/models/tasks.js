var mongoose = require('mongoose');

var Task = mongoose.model('ToDo', {
    taskName: {
        type: String,
        required: true,
        minlength: 5, 
        trim: true
    },
    employeeName: {
        type: String,
        required: true, 
        trim: true
    },
    username: {
        type: String,
        required: true, 
        trim: true
    },
    start: {
        type: Number, 
        default: null
    }, 
    end: {
        type: Number, 
        default: null
    }
}, 'ToDo');

module.exports = {
    Task
}