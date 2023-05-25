const express = require('express');
const cartItemRt = express.Router();
const cartItemCtrl = require('../controllers').cartItemCtrl;
const { authenticateToken } = require('../middlewares/authenticateToken');

cartItemRt.get('/showcart', authenticateToken, cartItemCtrl.showCart);
cartItemRt.post('/addtocart', authenticateToken, cartItemCtrl.addToCart);
cartItemRt.delete('/deletefromcart', authenticateToken, cartItemCtrl.removeFromCart);

// cartItemRt.get('/', cartItemCtrl.getAll);
// cartItemRt.put('/update', cartItemCtrl.updateCart);  add patch for changing count

module.exports = cartItemRt;