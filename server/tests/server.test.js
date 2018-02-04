const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');

const dummyDB = [{
    text: 'First test to do'
}, {
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
