const { Cart, User } = require('../models');

async function getAll(req, res) {
    try {
        const carts = await Cart.findAll({
            include: [
                {
                  model: User,
                  attributes: ['email']
                }
              ],
            attributes: { exclude: ['userId'] }
        }); 
        res.status(200).json(carts);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

async function getOne(req, res) {
    const { id } = req.params;

    try {
        const cart = await Cart.findOne({ 
            where: { id },
            include: [
                {
                  model: User,
                  attributes: ['email']
                }
              ],
            attributes: { exclude: ['userId'] }
        }); 
        res.status(200).json(cart);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

async function createCart(req, res) {
    // const { id } = req.body;
    const { id } = req.user;
    
    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cart = await Cart.findOne({ where: { userId: id } });
        
        if (cart) {
            return res.status(409).json({ message: 'Cart already exists.' });
        }

        await Cart.create({ userId: id });
        return res.status(201).json({ message: 'Cart created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteCart(req, res) {
    const { id } = req.query;

    try {
        const deletedCart = await Cart.destroy({ where: { id } });
      
        if (deletedCart > 0) {
          return res.status(200).json({ message: 'Cart deleted successfully'});
        } else {
            return res.status(404).json({ error: 'Cart not found' });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAll,
    getOne,
    createCart,
    deleteCart
}