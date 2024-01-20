const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todosController')

router.get('/', todosController.indexTodos)
router.post('/', todosController.createTodo)
router.put('/:id', todosController.updateTodo)
router.delete('/:id', todosController.deleteTodo)
router.get('/:id', todosController.getTodo)

module.exports = router