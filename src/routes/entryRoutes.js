const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.post('/', entryController.create);
router.get('/', entryController.getAll);
router.get('/:id', entryController.getById);
router.put('/:id', entryController.update);
router.delete('/:id', entryController.delete);
router.get('/:id/todos', entryController.getTodos);
router.post('/:id/todos', entryController.createTodo);

module.exports = router;
