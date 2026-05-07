const { v4: uuidv4 } = require('uuid');
const { db, save } = require('../config/database');

const Entry = {
  create(data) {
    const entry = {
      id: uuidv4(),
      title: data.title,
      content: data.content || '',
      date: data.date || new Date().toISOString().split('T')[0],
      mood: data.mood || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.entries.push(entry);
    save();
    return entry;
  },

  getById(id) {
    return db.entries.find(e => e.id === id) || null;
  },

  getAll(filter = {}) {
    let entries = [...db.entries];
    if (filter.date) entries = entries.filter(e => e.date === filter.date);
    if (filter.mood) entries = entries.filter(e => e.mood === filter.mood);
    return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
  },

  update(id, data) {
    const index = db.entries.findIndex(e => e.id === id);
    if (index === -1) return null;
    const allowed = ['title', 'content', 'date', 'mood'];
    const updates = Object.fromEntries(
      Object.entries(data).filter(([k]) => allowed.includes(k) && data[k] !== undefined)
    );
    db.entries[index] = { ...db.entries[index], ...updates, updatedAt: new Date().toISOString() };
    save();
    return db.entries[index];
  },

  delete(id) {
    const index = db.entries.findIndex(e => e.id === id);
    if (index === -1) return false;
    db.entries.splice(index, 1);
    db.todos = db.todos.filter(t => t.entryId !== id);
    save();
    return true;
  },
};

module.exports = Entry;
