const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')


const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const dummyDB = [{
    _id: new ObjectID(),
    text: 'First test to do'
}, {
    _id: new ObjectID(),
    text: 'Second test'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyDB);
    }).then(() => done());
});

describe('GET /todos', () => {
    it('Should get all Todos from DB', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        }).
        end(done());
    });
});

describe('GET /todos/:id', () => {
    it('Should return Todo by ID', (done) => {
        request(app)
        .get(`/todos/${dummyDB[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(dummyDB[0].text);
        })
        .end(done);
    });

    it('Should return 404 if Todo not found', (done) => {
        request(app)
        .get(`/todos/${new ObjectID().toHexString()}`)
        .expect(404)
        .end(done);
    });

    it('Should return 404 for invalid ID', (done) => {
        request(app)
        .get('/todos/SOME_INVALID_ID')
        .expect(404)
        .end(done);
    });
})

describe('POST /todos', () => {
    it('Should add new Todo to DB', (done) => {
        var text = 'New entry';
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((e, res) => {
            if (e) return done(e);

            Todo.find().then((todos) => {
                expect(todos.length).toBe(3);
                expect(todos[2].text).toBe(text);
                done();
            }).catch((e) => done(e))
        });
    });

    it('Should not add Todo with invalid data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((e, res) => {
            if (e) return done(e);

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        });
    });
});
