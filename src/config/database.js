const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../data/db.json');

function load() {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    }
  } catch (e) {
    console.error('Failed to load database:', e.message);
  }
  return { entries: [], todos: [] };
}

const db = load();

function save() {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

module.exports = { db, save };
