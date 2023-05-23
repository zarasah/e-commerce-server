const { Category } = require('../models');
const { Product } = require('../models');
const categorySchema = require('../validation/categorySchema');

async function getAll(req, res) {
    console.log('ALL')
    try {
        const categories = await Category.findAll(); 
        res.status(200).json(categories);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

async function getOne(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        const category = await Category.findOne({ where: { id } }); 
        res.status(200).json(category);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

async function createCategory(req, res) {
    const { error } = categorySchema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details);
    }

    try {
        const { name } = req.body;

        const category = await Category.findOne({where: { name } });

        if (category) {
            return res.status(409).json({ message: 'Category already exists.' });
        }
        
        await Category.create({
            name
        })
        res.status(201).json({ message: 'Category created' });
    } catch(error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to create category' });
    }
}

async function updateCategory(req, res) {
    const { error } = categorySchema.validate(req.body);

    if (error) {
        return res.status(400).json(error.details);
    }

    const { id } = req.query;
    const { name } = req.body;

    const category = await Category.findOne({ where: { id } });
      
    if (!category) {
        return res.status(404).json({ error: 'Category not found' });
    }

    category.name = name;

    try {
        await category.save();
        return res.status(200).json({ message: 'Category name updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update category name' });
    }
}

async function deleteCategory(req, res) {
    const { id } = req.query;

    try {
        const deletedCategory = await Category.destroy({ where: { id } });
      
        if (deletedCategory > 0) {
          const deletedProducts = await Product.destroy({ where: { categoryId: id } });
      
          return res.status(200).json({ message: `Category and ${deletedProducts} associated products deleted successfully`});
        } else {
            return res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAll,
    getOne,
    createCategory,
    updateCategory,
    deleteCategory
}