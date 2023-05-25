'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart_Item.belongsTo(models.Cart, { foreignKey: 'cartId' });
      Cart_Item.belongsTo(models.Product, { foreignKey: 'productId' });
    }
  }
  Cart_Item.init({
    count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart_Item',
  });
  return Cart_Item;
};