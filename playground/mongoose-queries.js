const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

let id = '5b183e43ac6c452a861669d2';

Todo.find({
    _id: id
}).then((todos) => {
    console.log(todos);
});


//return a single object
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log(todo);
});


//return find by id
Todo.findById(id).then((todo) => {
    console.log('Todo find by id');
    console.log(todo);
});