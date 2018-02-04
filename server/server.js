const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var newTodo = new Todo({
        text: req.body.text
    });

    newTodo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.stats(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    if (!ObjectID.isValid(id)) return res.status(404).send({text: 'Not a valid ID.'});

    Todo.findById(id).then((todo) => {
        if (!todo) return res.status(404).send({text: 'No todo with that ID.'});
        res.send({todo});
    }).catch((e) => console.log(`[!] Exception: ${e}`));
}, (e) => {
    res.status(400).send();
});

// GET /todos/123fbxjafkfb

app.listen(3000, () => {
    console.log("Started on port 3000.");
});

module.exports = {app};
