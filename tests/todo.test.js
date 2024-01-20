const request = require('supertest')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const Todo = require('../models/todo')
const mongoose = require ('mongoose')
const server = app.listen(8080, () => console.log('Testing on Port 8080'))
let mongoServer 

beforeAll( async () => {
  mongoServer = await MongoMemoryServer.create()
  mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll( async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

describe('Test suite for the /todo routes on the api', () => {

  test('It should index all todos', async () => {
    const todo1 = new Todo({ title: 'Eat dinner', description: 'Yummy', completed: false })
    const todo2 = new Todo({ title: 'Take out garbage', description: 'Yuck', completed: true })
    const todo3 = new Todo({ title: 'Wooo', description: 'Aye', completed: true })
    await todo1.save()
    await todo2.save()
    await todo3.save()
    
    const response = await request(app)
      .get('/todos')

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body)).toBeTruthy()
    // check for required properties
    for(let i = 0; i < response.body.length; i++) {
      expect(response.body[i]).toHaveProperty('title')
      expect(response.body[i]).toHaveProperty('description')
      expect(response.body[i]).toHaveProperty('completed')
    }
  })

  // passes test
  test('It should create a new todo', async () => {
    const response = await request(app).post('/todos').send({ title: 'Eat dinner', description: 'Yummy', completed: false })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toEqual('Eat dinner')
    expect(response.body.description).toEqual('Yummy')
    expect(response.body.completed).toEqual(false)
  })

  test('It should get a specific todo item', async () => {
    const todo = new Todo({ title: 'Eat dinner', description: 'Yummy', completed: false })
    await todo.save()
    const response = await request(app).get(`/todos/${todo._id}`)
  
    expect(response.statusCode).toBe(200)
    expect(response.body.title).toEqual('Eat dinner')
    expect(response.body.description).toEqual('Yummy')
    expect(response.body.completed).toEqual(false)
  })

  // passes test
  test('It should update a todo item', async () => {
    const todo = new Todo({ title: 'Eat dinner', description: 'Yummy', completed: false })
    await todo.save()

    const response = await request(app)
      .put(`/todos/${todo._id}`)
      .send({ title: 'Eat lunch', description: 'Oh boy', completed: true })

    expect(response.statusCode).toBe(200)
    expect(response.body.title).toEqual('Eat lunch')
    expect(response.body.description).toEqual('Oh boy')
    expect(response.body.completed).toEqual(true)
  })

  // passes test
  test('It should delete a todo item', async () => {
    const todo = new Todo({ title: 'Eat dinner', description: 'Yummy', completed: false })
    await todo.save()

    const response = await request(app)
      .delete(`/todos/${todo._id}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toEqual('Todo deleted')
  })
})