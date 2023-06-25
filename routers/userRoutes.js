const express = require('express');
const userRt = express.Router();
const userCtrl = require('../controllers').userCtrl;
const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

userRt.get('/users', authenticateToken, checkAdmin, userCtrl.getAll);
userRt.get('/user/:id', authenticateToken, userCtrl.getOne);
userRt.post('/register', userCtrl.register);
userRt.post('/login', userCtrl.login);

module.exports = userRt;