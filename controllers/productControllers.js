const { Product } = require('../models');
const productSchema = require('../validation/productSchema');
// const productSchema = require('../validation/registerSchema');

async function create(req, res) {
    const {error} = productSchema.validate(req.body);
    
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    const { name, price, quantity, description, image, categoryId } = req.body;
    await Product.create({
        name,
        price,
        quantity, 
        description, 
        image,
        categoryId
    })
    res.status(201).json({ message: 'Product created' });
}

module.exports = {
    create
}