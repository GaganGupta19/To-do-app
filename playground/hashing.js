const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 10
};

let token = jwt.sign(data, '123abc');
console.log('token', token);

let decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
// let message = 'I am user !';
// let hash = SHA256(message).toString();
//
// console.log('message', message);
// console.log('sha', hash);
//
// let data = {
//     id: 4
// };
//
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// let resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();
//
// if(resultHash === token.hash){
//     console.log('data was not changed')
// }else{
//     console.log('data was changed')
// }