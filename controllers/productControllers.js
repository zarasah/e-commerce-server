const { Product, Category } = require('../models');
const productSchema = require('../validation/productSchema');

async function getAll(req, res) {
    try {
        const products = await Product.findAll({
            include: [
                {
                  model: Category,
                  attributes: ['name']
                }
              ],
              attributes: { exclude: ['categoryId'] }
        }); 
        res.status(200).json(products);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

async function createProduct(req, res) {
    const {error} = productSchema.validate(req.body);
    
    if (error) {
        res.status(400).json(error.details[0].message);
        return;
    }
    const { name, price, quantity, description, categoryId } = req.body;
    const imgName = req.file?.filename;
    const imgUrl = imgName ? `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/products/${imgName}` : null;

    const data = await Product.create({
        name,
        price,
        quantity, 
        description, 
        image: imgUrl,
        categoryId
    })
    res.status(201).json({ message: 'Product created', data });
}

async function updateProduct(req, res) {
    const {error} = productSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json(error.details[0].message);   
    }

    
}

module.exports = {
    getAll,
    createProduct,
    updateProduct
}