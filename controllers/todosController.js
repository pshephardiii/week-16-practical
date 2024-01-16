const Todo = require('../models/todo')


// fails test... responding with null array... same as video though
exports.indexTodos = async (req, res) => {
  try {
    const foundTodos = await Todo.find({})
    res.json(foundTodos)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body)
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// sending back null for some reason... this is the same as in the video
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id })
    res.json(todo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.updateTodo = async (req, res) => {
  try{
    const todo = await Todo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.json(todo)
  }catch(error){
    res.status(400).json({message: error.message})
  }
}

exports.deleteTodo = async (req, res) => {
  try{
    await Todo.findOneAndDelete({ _id: req.params.id })
    res.json({ message: 'Todo deleted' })
  }catch(error){
    res.status(400).json({message: error.message})
  }
}