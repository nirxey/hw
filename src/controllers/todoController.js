const Todo = require('../models/Todo');
const Entry = require('../models/Entry');

const todoController = {
  create(req, res, next) {
    try {
      const { title, entryId } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });
      if (entryId && !Entry.getById(entryId)) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      res.status(201).json(Todo.create({ title, entryId }));
    } catch (err) {
      next(err);
    }
  },

  getAll(req, res, next) {
    try {
      const filter = {};
      if (req.query.entryId !== undefined) filter.entryId = req.query.entryId || null;
      if (req.query.completed !== undefined) filter.completed = req.query.completed === 'true';
      res.json(Todo.getAll(filter));
    } catch (err) {
      next(err);
    }
  },

  getById(req, res, next) {
    try {
      const todo = Todo.getById(req.params.id);
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },

  update(req, res, next) {
    try {
      const { title, completed, entryId } = req.body;
      const todo = Todo.update(req.params.id, { title, completed, entryId });
      if (!todo) return res.status(404).json({ error: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      next(err);
    }
  },

  delete(req, res, next) {
    try {
      if (!Todo.delete(req.params.id)) return res.status(404).json({ error: 'Todo not found' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};

module.exports = todoController;
