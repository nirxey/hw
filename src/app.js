const express = require('express');
const cors = require('cors');
const path = require('path');
const entryRoutes = require('./routes/entryRoutes');
const todoRoutes = require('./routes/todoRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/entries', entryRoutes);
app.use('/api/todos', todoRoutes);

app.use(errorHandler);

module.exports = app;
