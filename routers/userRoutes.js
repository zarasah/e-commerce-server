const express = require('express');
const userRt = express.Router();
const userCtrl = require('../controllers').userCtrl;
const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

userRt.get('/users', authenticateToken, checkAdmin, userCtrl.getAll);
userRt.get('/user/:id', authenticateToken, userCtrl.getOne);
userRt.post('/register', userCtrl.register);
userRt.post('/login', userCtrl.login);
// userRt.put('/user/update', userCtrl.update);
// userRt.delete('/user/delete', userCtrl.delete);
// userRt.patch('/admin/updateuser', userCtrl.change);

module.exports = userRt;