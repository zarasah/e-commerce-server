const { Category } = require('../models');

async function create(req, res) {
    const { name } = req.body;
    await Category.create({
        name
    })
    res.status(201).json({ message: 'Category created' });
}

module.exports = {
    create
}