const express = require('express');
const router = express.Router();
const userRt = require('./userRoutes');
const categoryRt = require('./categoryRoutes');
const productRt = require('./productRoutes');

router.use(userRt);
router.use('/category', categoryRt);
router.use('/product', productRt);

module.exports = router;