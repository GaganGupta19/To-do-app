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

    //delete all
    // db.collection('Todos').deleteMany({text: 'Set a reminder'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Could not run Delete Many', err);
    // });

    //delete one
    // db.collection('Todos').deleteOne({text: 'Delete this record'}).then((result) => {
    //     console.log(result);
    // }, (err) => {
    //     console.log('Could not run Delete Many', err);
    // });

    //find one and delete
    db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
        console.log(result);
    }, (err) => {
        console.log('Could not perform the function', err);
    });

    client.close();
});