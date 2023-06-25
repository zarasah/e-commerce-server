const { Cart, Product, Cart_Item} = require('../models');
const { Op } = require('sequelize');

async function showCart(req, res) {
  // const userId = req.body.id; // req.user.id
  
  const userId = req.query.userId;
  
  Cart.findOne({ where: { userId } })
  .then(cart => {
    if (cart) {
      Cart_Item.findAll({
        where: { cartId: cart.id },
        include: {
          model: Product,
          attributes: ['id', 'name', 'price', 'image'],
        },
        attributes: ['count'],
      })
        .then(cartProducts => {
          const products = cartProducts.map(cp => ({
            id: cp.Product.id,
            name: cp.Product.name,
            price: cp.Product.price,
            image: cp.Product.image,
            count: cp.count,
          }));
          res.status(200).json({ products });
        })
        .catch(error => {
          console.error('Error retrieving cart products:', error);
          res.status(500).json({ message: 'Failed to retrieve cart products', error });
        });
    } else {
      console.log('User does not have a cart');
      res.status(404).json({ message: 'User does not have a cart' });
    }
  })
  .catch(error => {
    console.error('Error retrieving user cart:', error);
    res.status(500).json({ message: 'Failed to retrieve user cart', error });
  });
}

async function addToCart(req, res) {
  const userId = req.body.userId;
  const productId = req.body.productId;

  Cart.findOne({ where: { userId } })
  .then((cart) => {
    if (cart) {
      Product.findByPk(productId)
        .then((product) => {
          if (product) {
            Cart_Item.findOne({ where: { cartId: cart.id, productId } })
              .then((cartProduct) => {
                if (cartProduct) {
                  cartProduct.count += 1;
                  return cartProduct.save();
                } else {
                  return Cart_Item.create({ cartId: cart.id, productId, count: 1 });
                }
              })
              .then((updatedCartProduct) => {
                res.status(200).json({ message: 'Product added to the cart', cartProduct: updatedCartProduct });
              })
              .catch((error) => {
                console.error('Error adding product to the cart:', error);
                res.status(500).json({ message: 'Failed to add product to the cart', error });
              });
          } else {
            res.status(404).json({ message: 'Product not found' });
          }
        })
        .catch((error) => {
          console.error('Error retrieving product:', error);
          res.status(500).json({ message: 'Failed to retrieve product', error });
        });
    } else {
      console.log('User does not have a cart');
      res.status(404).json({ message: 'User does not have a cart' });
    }
  })
  .catch((error) => {
    console.error('Error retrieving user cart:', error);
    res.status(500).json({ message: 'Failed to retrieve user cart', error });
  });
}

async function updateCartItem(req, res) {
  const userId = req.body.userId;
  const productId = req.body.productId;

  Cart.findOne({ where: { userId } })
  .then(cart => {
    if (cart) {
      Cart_Item.findOne({ where: { cartId: cart.id, productId } })
        .then(cartProduct => {
          if (cartProduct) {
            if (cartProduct.count === 1) {
              cartProduct.destroy();
              // return res.status(200).json({ success: true, count: 0 });
            } else {
              cartProduct.count -= 1;
              return cartProduct.save();
            }
          } else {
            console.log('Product not found in the cart');
            return res.status(404).json({ message: 'Product not found in the cart' });
          }
        })
        .then((result) => {
          if (!result) {
            return res.status(200).json({ success: true, count: 0 });
          } else {
            return res.status(200).json({ message: 'Product deleted from the cart', count: result.count });
          }
        })
        .catch(error => {
          console.error('Error deleting product from the cart:', error);
          return res.status(500).json({ message: 'Failed to delete product from the cart', error });
        });
    } else {
      console.log('User does not have a cart');
      return res.status(404).json({ message: 'User does not have a cart' });
    }
  })
  .catch(error => {
    console.error('Error retrieving user cart:', error);
    return res.status(500).json({ message: 'Failed to retrieve user cart', error });
  });
}

async function removeFromCart(req, res) {
  const userId = req.query.userId;
  const productIds = req.body.productsIds;
  console.log(userId, productIds)
  try {
    const cart = await Cart.findOne({ where: { userId } });
    let deletedRows = 0;
    if (productIds.length !== 0) {
      deletedRows = await Cart_Item.destroy({
        where: {
          [Op.and]: [
            { cartId: cart.id },
            { productId: { [Op.in]: productIds } },
          ],
        },
      });
    } else {
      deletedRows = await Cart_Item.destroy({ where: { cartId: cart.id } })
    }
    return res.status(200).json({ message: `${deletedRows} record(s) deleted successfully.` });
  } catch (error) {
    console.error('Error deleting records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  showCart,
  addToCart,
  updateCartItem,
  removeFromCart,
}
