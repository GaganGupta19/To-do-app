const expect = require('expect');
const request =  require('supertest');

const {ObjectId} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectId(),
    text: 'First todo'
}, {
    _id: new ObjectId(),
    text: 'second todo'
}];


beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new Todo', (done) => {
        let text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('Should not create todo without body', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
               Todo.find().then((todos) => {
                   expect(todos.length).toBe(2);
                   done();
               }).catch((e) => done(e));
            });
    })
});

describe('GET /todos', () => {
    it('should GET all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should GET the item', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 as status', (done) => {
        let newId = new ObjectId();
        request(app)
            .get(`/todos/${newId.toHexString()}`)
            .expect(404)
            .end(done);
    })
});

describe('DELETE /todos/:id', () => {
    it('should DELETE the item', (done) => {
        let itemId = todos[0]._id;
        request(app)
            .delete(`/todos/${itemId.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(todos[0].text)
            })
            .end(done);
    });

    it('should return 404 as the status', (done) => {
        let itemId = new ObjectId;
        request(app)
            .delete(`/todos/${itemId.toHexString()}`)
            .expect(404)
            .end(done);
    });
});