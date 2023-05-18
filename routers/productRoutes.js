const express = require('express');
const productRt = express.Router();
const productCtrl = require('../controllers').productCtrl;

productRt.get('/create', (req, res) => {
    res.send('products create')
});
// productRt.get('/', productCtrl.getAll);
// productRt.get('/:id', productCtrl.getOne);
productRt.post('/create', productCtrl.create);
// productRt.put('/update', productCtrl.update);
// productRt.delete('/delete', productCtrl.delete);


module.exports = productRt;