const {MongoClient, ObjectID} = require('mongodb');

var database = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(database, (e, _db) => {
    if (e) {
        return console.log(`[!] Exception ${e}`);
    }
    console.log(`[*] Connected to MongoDB at ${database}`);

    db = _db.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate({
    //     text: 'Eat dinner',
    //     complete: true
    // }, {
    //     $set: {
    //         complete: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((r) => {
    //     console.log(`[*] Results:\n${JSON.stringify(r, undefined, 4)}`);
    // }, (e) => {
    //     console.log(`[!] Exception: ${e}`);
    // });

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a76bf40193f401c76875a3c')
    }, {
        $set: {
            name: 'Chase Taylor'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    })
    .then((r) => {
        console.log(`[*] Results:\n${JSON.stringify(r, undefined, 4)}`);
    }, (e) => {
        console.log(`[!] Exception: ${e}`);
    });

    _db.close();
});
