const express = require('express');
const cartItemRt = express.Router();
const cartItemCtrl = require('../controllers').cartItemCtrl;
const { authenticateToken } = require('../middlewares/authenticateToken');

cartItemRt.get('/showcart', authenticateToken, cartItemCtrl.showCart);
cartItemRt.post('/addtocart', authenticateToken, cartItemCtrl.addToCart);
cartItemRt.put('/updatecartitem', authenticateToken, cartItemCtrl.updateCartItem);
cartItemRt.delete('/deletefromcart', authenticateToken, cartItemCtrl.removeFromCart);

module.exports = cartItemRt;