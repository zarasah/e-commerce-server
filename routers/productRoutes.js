const express = require('express');
const productRt = express.Router();
const productCtrl = require('../controllers').productCtrl;
const upload = require('../middlewares/upload');

productRt.get('/:id', productCtrl.getOne);
productRt.get('/', productCtrl.getAll);
productRt.post('/create', upload.single('img'), productCtrl.createProduct);
productRt.put('/update', upload.single('img'), productCtrl.updateProduct);
productRt.delete('/delete', productCtrl.deleteProduct);

module.exports = productRt;