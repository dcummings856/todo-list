const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()
const PORT = 8000
require('dotenv').config()

let dbConnectionStr = process.env.DB_STRING

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: 
true })
  .then(client => {
  console.log('Connected to Database')
  const db = client.db('todo-list-todos')
  const todosCollection = db.collection('todos')
  // const completedCollection = db.collection('completedTodos')

  app.get('/', (request, response) => {
    db.collection('todos').find().toArray()
      .then(results => {
        response.render('index.ejs', { todos: results })
      })
      .catch(error => console.error(error))
  })
  
  app.post('/todos', (request, response) => {
    todosCollection.insertOne(request.body)
      .then(result => {
        response.redirect('/')
      })
      .catch(error => console.error(error))
  })

  app.put('/todos', (request, response) => {
    todosCollection.updateOne({todos: request.body.todosX}, {
      $set: {
        todos: request.body.todosX + 'completed'
      }
    })
    .then(result => {
      console.log('Completed')
      response.json('JSON Completed')
    })
    .catch(error => console.error(error))
  })

  app.delete('/deleteTodo', (request, response) => {
    db.collection('todos').deleteOne({todos: request.body.todosX})
    .then(result => {
      console.log('todo deleted')
      response.json('todo deleted')
    })
    .catch(error => console.error(error))
  })
  
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on ${PORT}`)
  })

  })
  .catch(error => console.log(error))

