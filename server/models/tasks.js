var mongoose = require('mongoose');

var Task = mongoose.model('Tasks', {
    taskName: {
        type: String,
        required: true,
        minlength: 5, 
        trim: true
    },
    completed: {
        type: Boolean, 
        default: false
    }, 
    completedAt: {
        type: Number, 
        default: null
    }
}, 'Tasks');

module.exports = {
    Task
}