const router = require('express').Router();

const controller = require('../controller/todoController');

router
  .get('/', controller.retrieveAllTodos)
  .post('/', controller.addTodo)
  .put('/:id', controller.updateTodo)
  .delete('/:id', controller.deleteTodo);

module.exports = router;
