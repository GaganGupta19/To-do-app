const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

let id = '5b183e43ac6c452a861669d2';
//let id = '6b183e43ac6c452a861669d2';
let userId = '5b144bf5fdb9925ce7f49c93';

//
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({_id: '5b2df37eaaffc89547eb11e0'}).then((result) => {
    console.log(result);
});

// Todo.findByIdAndRemove('5b2dec88aaffc89547eb0faf').then((result) => {
//    console.log(result);
// });