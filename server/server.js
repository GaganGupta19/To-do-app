let mongoose = require('mongoose');

mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number
    }
});

let newTodo = new Todo({
    text: 'Cook Dinner'
});

newTodo.save().then((doc) => {
    console.log('Saved Todo', doc);
}, (err) => {
    console.log('Could not save', err)
});

let otherTodo = new Todo({
    text: 'Set a reminder',
    completed: true,
    completedAt: 123
});

otherTodo.save().then((doc) => {
    console.log('successfully saved', doc);
}, (err) => {
    console.log('Could not save the value', err);
});