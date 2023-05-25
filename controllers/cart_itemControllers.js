const { Cart, Product, Cart_Item} = require('../models');

async function showCart(req, res) {
  const userId = req.user.id;

  Cart.findOne({ where: { userId } })
  .then(cart => {
    if (cart) {
      Cart_Item.findAll({
        where: { cartId: cart.id },
        include: {
          model: Product,
          attributes: ['name'],
        },
        attributes: ['count'],
      })
        .then(cartProducts => {
          const products = cartProducts.map(cp => ({
            name: cp.Product.name,
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

  // try {
  //   const cart = await Cart.findOne({ where: { userId } });
  
  //   if (!cart) {
  //     return res.status(404).json({ message: 'Cart not found' });
  //   }

  //   const products = await cart.getProducts();
  
  //   res.status(200).json({ products });
  // } catch (error) {
  //   console.error('Error retrieving products from cart:', error);
  //   res.status(500).json({ error: 'Failed to retrieve products from cart' });
  // }
}

async function addToCart(req, res) {
  const userId = req.user.id;
  const productId = req.body.id;

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
  
  // try {
  //   const cart = await Cart.findOne({ where: {userId } });
  
  //   if (!cart) {
  //     return res.status(404).json({ message: 'Cart not found' });
  //   }
  
  //   const product = await Product.findByPk(productId);
  
  //   if (!product) {
  //     return res.status(404).json({ message: 'Product not found' });
  //   }
  
  //   const cartItem = await cart.getProducts({
  //     where: { id: productId },
  //     through: { attributes: ['count'] },
  //   });
  
  //   if (cartItem.length === 0) {
  //     await cart.addProduct(product, { through: { count: 1 } });
  //   } else {
  //     await cart.addProduct(product, { through: { count: cartItem[0].Cart_Item.count + 1 } });
  //   }

  //   res.status(200).json({ message: 'Product added to the cart' });
  // } catch (error) {
  //   console.error('Error adding product to cart:', error);
  //   res.status(500).json({ error: 'Failed to add product to cart' });
  // }
}

async function removeFromCart(req, res) {
  const userId = req.user.id;
  const productId = req.body.id;

  Cart.findOne({ where: { userId } })
  .then(cart => {
    if (cart) {
      Cart_Item.findOne({ where: { cartId: cart.id, productId } })
        .then(cartProduct => {
          if (cartProduct) {
            return cartProduct.destroy();
          } else {
            console.log('Product not found in the cart');
            return res.status(404).json({ message: 'Product not found in the cart' });
          }
        })
        .then(() => {
          console.log('Product deleted from the cart');
          return res.status(200).json({ message: 'Product deleted from the cart' });
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

module.exports = {
  showCart,
  addToCart,
  removeFromCart,
}
