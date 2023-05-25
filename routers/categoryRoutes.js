const express = require('express');
const categoryRt = express.Router();
const categoryCtrl = require('../controllers').categoryCtrl;
const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

categoryRt.get('/', categoryCtrl.getAll);
categoryRt.get('/:id', categoryCtrl.getOne);
categoryRt.post('/create', authenticateToken, checkAdmin, categoryCtrl.createCategory);
categoryRt.put('/update', authenticateToken, checkAdmin, categoryCtrl.updateCategory);
categoryRt.delete('/delete', authenticateToken, checkAdmin, categoryCtrl.deleteCategory);

module.exports = categoryRt

