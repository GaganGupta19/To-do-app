/* connecting to mongo db */
//const MongoClient = require('mongodb').MongoClient;
// using destructuring feature of ES 6
const {MongoClient, ObjectID} = require('mongodb');

// establishing connection
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    //fetch all
    db.collection('Todos').find().toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 1));
    }, (err) => {
        console.log('Unable to find Todos', err);
    });

    //fetch with some query
    db.collection('Todos').find({completed: false}).toArray().then((docs) => {
        console.log('Todos with search query');
        console.log(JSON.stringify(docs, undefined, 1));
    }, (err) => {
        console.log('Unable to find Todos', err);
    });


    //fetch with id "5b13db78652b9a2140be97e6"
    db.collection('Todos').find({
        _id: new ObjectID("5b13db78652b9a2140be97e6")
    }).toArray().then((docs) => {
        console.log('Todos with ObjectID');
        console.log(JSON.stringify(docs, undefined, 1));
    }, (err) => {
        console.log('Unable to find Todos', err);
    });

    //fetching the count
    db.collection('Todos').find().count().then((count) => {
        console.log(`Todos count : ${count}`);
        //console.log(JSON.stringify(docs, undefined, 1));
    }, (err) => {
        console.log('Unable to find Todos', err);
    });

    client.close();
});