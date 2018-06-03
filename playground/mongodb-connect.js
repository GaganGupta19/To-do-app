/* connecting to mongo db */
const MongoClient = require('mongodb').MongoClient;

// establishing connection
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    db.collection('Todos').insertOne({
        text: 'Something to do',
        completed: false
    }, (err, result) => {
       if(err){
           return console.log('Unable to insert Todo', err);
       }
       console.log(JSON.stringify(result.ops, undefined, 1))
    });

    db.collection('Users').insertOne({
       name: 'Gagan',
       age: '24',
       location: 'Ashok Vihar'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert User record', err);
        }
        console.log(JSON.stringify(result.ops, undefined, 1));
    });

    client.close();
});