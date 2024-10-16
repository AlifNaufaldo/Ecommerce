'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Order.belongsTo(models.User)
      // Order.belongsTo(models.Product)
    }
  }
  Order.init({
    productId:{
      type: DataTypes.INTEGER,
      references: {
          model: 'Products',
          key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    quantity: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};