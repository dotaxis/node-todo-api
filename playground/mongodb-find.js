const {MongoClient, ObjectID} = require('mongodb');

var database = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(database, (e, db_) => {
    if (e) {
        return console.log(`[!] Exception ${e}`);
    }
    console.log(`[*] Connected to MongoDB at ${database}`);

    db = db_.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5a76be0c6e366d1c0c46057f')
    // }).toArray().then((docs) => {
    //     console.log('Todo:');
    //     console.log(docs);
    // }, (e) => {
    //     console.log(`[!] Exception: ${e}`);
    // });

    // db.collection('Todos').find().count().then((c) => {
    //     console.log(`[+] # of todos: ${c}`);
    // }, (e) => {
    //     console.log(`[!] Exception: ${e}`);
    // });

    db.collection('Users').find({age: 22}).toArray().then((c) => {
        console.log(JSON.stringify(c, undefined, 4));
    }, (e) => {
        console.log(`[!] Exception: ${e}`);
    });

    db_.close();
});
