const express = require('express');
const categoryRt = express.Router();
const categoryCtrl = require('../controllers').categoryCtrl;

// categoryRt.get('/', categoryCtrl.getAll);
categoryRt.post('/create', categoryCtrl.create);
// categoryRt.put('/update', categoryCtrl.update);
// categoryRt.delete('/delete', categoryCtrl.delete);

module.exports = categoryRt;

// categoryRt.get('/categories', categoryCtrl.getAll);
// categoryRt.post('/admin/createcategory', categoryCtrl.create);
// categoryRt.put('/admin/updatecategory', categoryCtrl.update);
// categoryRt.delete('/admin/deletecategory', categoryCtrl.delete);


