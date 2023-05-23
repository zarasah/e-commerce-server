const express = require('express');
const categoryRt = express.Router();
const categoryCtrl = require('../controllers').categoryCtrl;

categoryRt.get('/', categoryCtrl.getAll);
categoryRt.get('/:id', categoryCtrl.getOne);
categoryRt.post('/create', categoryCtrl.createCategory);
categoryRt.put('/update', categoryCtrl.updateCategory);
categoryRt.delete('/delete', categoryCtrl.deleteCategory);

module.exports = categoryRt

