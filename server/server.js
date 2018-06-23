let express = require('express');
let bodyParser = require('body-parser');

let {ObjectId} = require('mongodb');
let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

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

app.listen(3000, () => {
    console.log('Started on port 3000')
});


module.exports = {app};