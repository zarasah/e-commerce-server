const express = require('express');
const router = express.Router();
const userRt = require('./userRoutes');
const categoryRt = require('./categoryRoutes');
const productRt = require('./productRoutes');
const cartRt = require('./cartRoutes');
const cartItemRt = require('./cart_itemRoutes');

router.use(userRt);
router.use('/category', categoryRt);
router.use('/product', productRt);
router.use('/cart', cartRt);
router.use('/basket', cartItemRt);

module.exports = router;