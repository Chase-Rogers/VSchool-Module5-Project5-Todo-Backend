const express = require('express')
const todoRouter = express.Router()
const { v4: uuidv4 } = require('uuid')

const todos = [
    { name: 'Buy Soap', description: 'dove', imageUrl: 'image', completed: false, _id: uuidv4() },
    { name: 'Finish Project', description: 'Todo App', imageUrl: 'image', completed: false, _id: uuidv4() },
    { name: 'Go Fishing', description: 'buy bait and lure', imageUrl: 'image', completed: false, _id: uuidv4() },
    { name: 'Attend Meeting', description: 'It might be unproductive', imageUrl: 'image', completed: false, _id: uuidv4() },
    { name: 'Have Morning Coffee', description: 'Make some for self and wife', imageUrl: 'image', completed: false, _id: uuidv4() }
]

todoRouter.route('/')
    .get (( req, res ) => {
        res.send(todos)
    })
    .post(( req, res ) => {
        const newTodo = req.body
        newTodo._id = uuidv4()
        todos.push(newTodo)
        res.send(`Successfully added ${newTodo.name} to the database!`)
    })

    todoRouter.get('/:todoId', ( req, res ) => {
        const todoId = req.params.todoId
        const foundTodo = todos.find(todo => {
            return todo._id === todoId
        })
        res.send(foundTodo)
    })

    todoRouter.delete('/:todoId', ( req, res ) => {
        const todoId = req.params.todoId
        const todoIndex = todos.findIndex(todo => todo._id === todoId)
        todos.splice(todoIndex, 1)
        res.send('todo removed')
    })

    todoRouter.put('/:todoId', ( req, res ) => {
        const todoId = req.params.todoId
        const todoIndex = todos.findIndex(todo => todo._id === todoId)
        const updatedTodo = Object.assign(todos[todoIndex], req.body)
        res.send(updatedTodo)
    })

    module.exports = todoRouter