const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b183e43ac6c452a861669d2';
//let id = '6b183e43ac6c452a861669d2';
let userId = '5b144bf5fdb9925ce7f49c93';
//
// if(!ObjectId.isValid(id)){
//     console.log('id not valid');
// }
//
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// });
//
// //return a single object
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo);
// });
//
// //return find by id
// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo find by id');
//     console.log(todo);
// }).catch((e) => console.log(e));

// for users
User.find({
    _id: userId
}).then((users) => {
    console.log('users');
    console.log(users);
});

// for single user
User.findOne({
    _id: userId
}).then((user) => {
    console.log('Find one user');
    console.log(user);
});

//for find by id
User.findById(userId).then((user) => {
    console.log('find by id user');
    console.log(user);
}).catch((e) => {console.log(e)});
