'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.removeColumn('Cart_Items', 'cartId');
    queryInterface.removeColumn('Cart_Items', 'productId');
  },

  async down (queryInterface, Sequelize) {
    queryInterface.addColumn('Cart_Items', 'cartId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references:{
        model:'Cart', 
        key:'id'
      }
    });
    
    queryInterface.addColumn('Cart_Items', 'productId', {
      type: Sequelize.INTEGER,
      allowNull: false,
        references:{
          model:'Products', 
          key:'id'
        }
    });    
  }
};
