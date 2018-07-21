const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');
let {authenticate} = require('./middleware/authenticate');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    let todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        });
    }, (e) => {
        res.status(400).send(e);
    })
});

//get a specific item
app.get('/todos/:id', (req, res) => {
   let id = req.params.id;

   if(!ObjectId.isValid(id)){
       return res.status(404).send({'error': 'Invalid ID'});
   }

   Todo.findById(id).then((todo) => {
       if(!todo){
          return res.status(404).send({'error': 'Not found'});
       }
       res.send(todo);
   }).catch((e) => res.status(404).send(e));
});

//delete
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if(!ObjectId.isValid(id)){
        return res.status(404).send({'error': 'Invalid ID'});
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send({'error': 'Not found'});
        }
        res.send(todo);
    }).catch((e) => res.status(400).send(e));
});

//patch route
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send({'error': 'Invalid ID'});
    }
    Todo
});

//post user
app.post('/users', (req, res) => {
    let body = _.pick(req.body, ['email', 'password']);
    let user = new User(body);
    user.save().then(() => {
        console.log('hey');
        let token = user.generateAuthToken();
        console.log(token);
        console.log('generated token');
        return token;
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    })
});

app.post('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.listen(port, () => {
    console.log(`Started up at ${port}`)
});


module.exports = {app};