const express = require('express');
const productRt = express.Router();
const productCtrl = require('../controllers').productCtrl;
const upload = require('../middlewares/upload');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { checkAdmin } = require('../middlewares/checkAdmin');

productRt.get('/:id', productCtrl.getOne);
productRt.get('/', productCtrl.getAll);
productRt.post('/create', authenticateToken, checkAdmin, upload.single('img'), productCtrl.createProduct);
productRt.put('/update', authenticateToken, checkAdmin, upload.single('img'), productCtrl.updateProduct);
productRt.delete('/delete', authenticateToken, checkAdmin, productCtrl.deleteProduct);

module.exports = productRt;