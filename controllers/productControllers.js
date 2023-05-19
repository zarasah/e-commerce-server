const { Product, Category } = require('../models');
const productSchema = require('../validation/productSchema');
const fs = require('fs');

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

    try {
        const data = await Product.create({
            name,
            price,
            quantity, 
            description, 
            image: imgUrl,
            categoryId
        })
        res.status(201).json({ message: 'Product created', data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create product' });
    } 
}

async function updateProduct(req, res) {
    console.log(req.path)
    const {error} = productSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json(error.details[0].message);   
    }

    try {
        const { id } = req.query;
        const { name, price, quantity, description, categoryId } = req.body;
        const imgName = req.file?.filename;
        let updatedData = 0;

        if (imgName) {
            const product = await Product.findByPk(id);

            if (product.image) {
                const imgName = product.image.split('/').pop();
                const imgPath = './uploads/products/' + imgName;
                fs.unlink(imgPath, (err) => {
                    if (err) {
                      console.error(err);
                      return;
                    }
                    console.log('File has been deleted');
                  });
            }

            const image = `${req.protocol}://${req.hostname}:${process.env.PORT}/uploads/products/${imgName}`;
            updatedData = await Product.update({ name, price, quantity, description, image, categoryId }, { where: { id } });
        } else {
            updatedData = await Product.update({ name, price, quantity, description, categoryId }, { where: { id } });
        }

        if (updatedData) {
            return res.status(200).json({ message: 'Product updated successfully' });
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update product' });
    }
}

async function deleteProduct(req, res) {
    const { id } = req.query;

    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.image) {
            const imgName = product.image.split('/').pop();
            const imgPath = './uploads/products/' + imgName;

            fs.unlink(imgPath, (err) => {
                if (err) {
                console.error(err);
                return;
                }
                console.log('File has been deleted');
            });
        }

        await Product.destroy({ where: { id } });
        return res.status(200).json({ message: 'Product deleted successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete product' });
    }
}

module.exports = {
    getAll,
    createProduct,
    updateProduct,
    deleteProduct
}