const { Product } = require('../models');

async function create(req, res) {
    const { name, price, categoryId } = req.body;
    await Product.create({
        name,
        price,
        categoryId
    })
    res.status(201).json({ message: 'Product created' });
}

module.exports = {
    create
}