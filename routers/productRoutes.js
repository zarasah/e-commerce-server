const express = require('express');
const productRt = express.Router();
const productCtrl = require('../controllers').productCtrl;
const upload = require('../middlewares/upload');

productRt.get('/', productCtrl.getAll);
// productRt.get('/:id', productCtrl.getOne);
productRt.post('/create', upload.single('img'), productCtrl.createProduct);
productRt.put('/update', productCtrl.updateProduct);
// productRt.delete('/delete', productCtrl.delete);


module.exports = productRt;