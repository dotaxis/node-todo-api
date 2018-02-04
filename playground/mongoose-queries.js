const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var _id = '5a76dd9d74a6d42642313b3b';

if (!ObjectID.isValid(_id)) {
    console.log('ID is not valid.');
}

// Todo.find({_id}).then((todos) => {
//     console.log(`Todos found: ${todos}`);
// }).catch((e) => {
//     console.log(`[!] Exception: ${e}`);
// });
//
// Todo.findOne({_id}).then((todo) => {
//     console.log(`Todo: ${todo}`);
// }).catch((e) => {
//     console.log(`[!] Exception: ${e}`);
// });
//
// Todo.findById(_id).then((todo) => {
//     console.log(`Todo by ID: ${todo}`);
// }).catch((e) => {
//     console.log(`[!] Exception: ${e}`);
// });


User.findById(_id).then((user) => {
    if (!user) return console.log('No user with that ID.');
    return console.log((`User by ID: ${JSON.stringify(user, null, 4)}`));
}).catch((e) => console.log(`[!] Exception: ${e}`));
