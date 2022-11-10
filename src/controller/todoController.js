const { json } = require('express');
const Todo = require('../model/Todo');

// Retrieve all todo tasks
exports.retrieveAllTodos = async (req, res) => {
  try {
    let todos = await Todo.find();
    if (todos.length === 0)
      return res.status(404).json({
        success: false,
        message: 'No todos found!',
      });
    res.status(200).json({
      success: true,
      message: 'Todos found',
      todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

// Add a todo task
exports.addTodo = async (req, res) => {
  try {
    let todo = await req.body;
    let addedTodo = await Todo.create(todo);
    if (!addedTodo)
      return res.status(400).json({
        success: false,
        message: 'Todo not created!',
      });
    return res.status(201).json({
      success: true,
      message: 'Todo created successfully!',
      todo: addedTodo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!',
      error: error.message,
    });
  }
};

// Update a particular todo task
exports.updateTodo = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let newTodo = await req.body;
    let updated = await Todo.findOneAndUpdate(id, newTodo, { new: true });

    if (!updated)
      return res.status(400).json({
        success: false,
        message: 'Todo not updated!',
      });

    return res.status(200).json({
      success: true,
      message: 'Todo updated successfully!',
      todo: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!',
      error: error.message,
    });
  }
};

// Delete a todo task
exports.deleteTodo = async (req, res) => {
  try {
    let id = { _id: req.params.id };
    let deleted = await Todo.findOneAndRemove(id);

    if (!deleted)
      return res.status(400).json({
        success: false,
        message: 'Todo not deleted!',
      });

    res.status(200).json({
      success: true,
      message: 'Todo deleted successfully!',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error!',
      error: error.message,
    });
  }
};
