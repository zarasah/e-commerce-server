const express = require('express');
const cartRt = express.Router();
const cartCtrl = require('../controllers').cartCtrl;

cartRt.get('/:id', cartCtrl.getOne);
cartRt.get('/', cartCtrl.getAll);
cartRt.post('/create', cartCtrl.createCart);
cartRt.delete('/delete', cartCtrl.deleteCart);
// cartRt.put('/update', cartCtrl.updateCart);


module.exports = cartRt;