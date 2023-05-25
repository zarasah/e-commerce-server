const express = require('express');
const cartRt = express.Router();
const cartCtrl = require('../controllers').cartCtrl;
const { authenticateToken } = require('../middlewares/authenticateToken');
// const { checkAdmin } = require('../middlewares/checkAdmin'); ??

cartRt.get('/:id', authenticateToken, cartCtrl.getOne);  // admin
cartRt.get('/', authenticateToken, cartCtrl.getAll);    //admin
cartRt.post('/create', authenticateToken, cartCtrl.createCart);
cartRt.delete('/delete', authenticateToken, cartCtrl.deleteCart);
// cartRt.put('/update', cartCtrl.updateCart);


module.exports = cartRt;