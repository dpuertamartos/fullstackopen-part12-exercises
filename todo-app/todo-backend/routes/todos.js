const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* GET todos added statistics */
router.get('/statistics', async (_, res) => {
  // For exercise 12_11
  const value = await redis.getAsync("added_todos");
  res.json({
      added_todos: Number(value) || 0
  });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  
  // For exercise 12_11
  const added_amount = Number((await redis.getAsync("added_todos")) || 0);
  redis.setAsync("added_todos", added_amount + 1)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo = await req.todo
  res.send(todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const updatedTodo = await req.todo.updateOne({
    text: req.body.text,
    done: req.body.done
  })
  res.send(updatedTodo)
});

router.use('/:id', findByIdMiddleware, singleRouter)

module.exports = router;