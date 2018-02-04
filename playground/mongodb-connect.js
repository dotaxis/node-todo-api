const {MongoClient} = require('mongodb');

var database = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(database, (e, db) => {
    if (e) {
        return console.log(`[!] Exception ${e}`);
    }
    console.log(`[*] Connected to MongoDB at ${database}`);

    dbTodoApp = db.db('TodoApp');
    // dbTodoApp.collection('Todos').insertOne({
    //     text: 'Make this better',
    //     complete: false
    // }, (e, r) => {
    //     if (e) return console.log(`[!] Exception: ${e}`);
    //
    //     console.log(JSON.stringify(r.ops, undefined, 4));
    // })

    // dbTodoApp.collection('Users').insertOne({
    //     name: 'Chase Taylor',
    //     age: 22,
    //     location: 'Canada'
    // }, (e, r) => {
    //     if (e) return console.log(`[!] Exception: ${e}`);
    //     console.log(r.ops[0]._id.getTimestamp());
    // });

    db.close();
});
