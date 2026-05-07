const { v4: uuidv4 } = require('uuid');
const { db, save } = require('../config/database');

const Todo = {
  create(data) {
    const todo = {
      id: uuidv4(),
      title: data.title,
      completed: false,
      entryId: data.entryId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.todos.push(todo);
    save();
    return todo;
  },

  getById(id) {
    return db.todos.find(t => t.id === id) || null;
  },

  getAll(filter = {}) {
    let todos = [...db.todos];
    if ('entryId' in filter) todos = todos.filter(t => t.entryId === filter.entryId);
    if ('completed' in filter) todos = todos.filter(t => t.completed === filter.completed);
    return todos;
  },

  update(id, data) {
    const index = db.todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    const allowed = ['title', 'completed', 'entryId'];
    const updates = Object.fromEntries(
      Object.entries(data).filter(([k]) => allowed.includes(k) && data[k] !== undefined)
    );
    db.todos[index] = { ...db.todos[index], ...updates, updatedAt: new Date().toISOString() };
    save();
    return db.todos[index];
  },

  delete(id) {
    const index = db.todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    db.todos.splice(index, 1);
    save();
    return true;
  },
};

module.exports = Todo;
