const Entry = require('../models/Entry');
const Todo = require('../models/Todo');

const entryController = {
  create(req, res, next) {
    try {
      const { title, content, date, mood } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });
      res.status(201).json(Entry.create({ title, content, date, mood }));
    } catch (err) {
      next(err);
    }
  },

  getAll(req, res, next) {
    try {
      const { date, mood } = req.query;
      res.json(Entry.getAll({ date, mood }));
    } catch (err) {
      next(err);
    }
  },

  getById(req, res, next) {
    try {
      const entry = Entry.getById(req.params.id);
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      res.json(entry);
    } catch (err) {
      next(err);
    }
  },

  update(req, res, next) {
    try {
      const { title, content, date, mood } = req.body;
      const entry = Entry.update(req.params.id, { title, content, date, mood });
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      res.json(entry);
    } catch (err) {
      next(err);
    }
  },

  delete(req, res, next) {
    try {
      if (!Entry.delete(req.params.id)) return res.status(404).json({ error: 'Entry not found' });
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  },

  getTodos(req, res, next) {
    try {
      const entry = Entry.getById(req.params.id);
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      res.json(Todo.getAll({ entryId: req.params.id }));
    } catch (err) {
      next(err);
    }
  },

  createTodo(req, res, next) {
    try {
      const entry = Entry.getById(req.params.id);
      if (!entry) return res.status(404).json({ error: 'Entry not found' });
      const { title } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });
      res.status(201).json(Todo.create({ title, entryId: req.params.id }));
    } catch (err) {
      next(err);
    }
  },
};

module.exports = entryController;
