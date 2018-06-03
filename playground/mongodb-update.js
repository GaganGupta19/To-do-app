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

    //find one and update
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5b13ffd4fd438d33286ae581')
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    //find one and update and increment
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5b13ddb50570d322111159db')
    }, {
        $inc: {
            age: +1
        },
        $set: {
            name: 'Gagan Gupta'
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    client.close();
});