const express = require('express');
const userRt = express.Router();
const userCtrl = require('../controllers').userCtrl;

// userRt.get('/admin/users', userCtrl.getAll);
// userRt.get('/user/:id', userCtrl.getOne);
userRt.post('/register', userCtrl.register);
userRt.post('/login', userCtrl.login);
// userRt.put('/user/update', userCtrl.update);
// userRt.delete('/user/delete', userCtrl.delete);
// userRt.patch('/admin/updateuser', userCtrl.change);

module.exports = userRt;