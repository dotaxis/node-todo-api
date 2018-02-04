const {MongoClient, ObjectID} = require('mongodb');

var database = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(database, (e, _db) => {
    if (e) {
        return console.log(`[!] Exception ${e}`);
    }
    console.log(`[*] Connected to MongoDB at ${database}`);

    db = _db.db('TodoApp');

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5a76c1a12fc6311d36dde64f')}).then((r) => {
        console.log(`[*] Results:\n${JSON.stringify(r, undefined, 4)}`);
    }, (e) => {
        console.log(`[!] Exception: ${e}`);
    });

    db.collection('Users').deleteMany({name: 'Chase Taylor'}).then((r) => {
        console.log(`[*] Results:\n${JSON.stringify(r,undefined, 4)}`);
    }, (e) => {
        console.log((`[!] Exception: ${e}`));
    });

    _db.close();
});
