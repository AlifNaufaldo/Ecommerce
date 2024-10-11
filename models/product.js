'use strict';
const {
  Model,
  where
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.User, {
        through: models.Order,
        foreignKey: 'productId',
        otherKey: 'userId'
      });
      Product.belongsTo(models.Category)
    }

    get formatPrice() {
      return new Intl.NumberFormat("id-ID", {
        style: "currency", currency: "IDR"
      }).format(price);
    }
    // static async getProducts(search = '', sortByPrice = 'ASC', Category) {
    //       const options = {
    //           include: {
    //               model: Category,  
    //               attributes: ['name'] 
    //           },
    //           where: {
    //               name: {
    //                   [Op.iLike]: `%${search}%` 
    //               }
    //           }
    //       };

    //       const products = await this.findAll(options);
    //       return products;

    // static getProductByCategory(filter, Category){
    //   let option = {
    //     include :{
    //       model: Category,
    //       attributes: [['name']]
    //     }
    //   }
    //   if (filter) {
    //     option.include.where = {
    //         name: filter,
    //     };
    //   }
    //   return Product.findAll(option)
    // }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Name cannot empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Description cannot empty`
        },
        len: {
          args: [5, 500],
          msg: 'Description must be between 5 and 500 characters'
      }
      }
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `price cannot empty`
        },
        min: {
          args: [1],
          msg: 'Price must be greater than 0'
      }
      }
    },
    imgUrl:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          msg: `Name cannot empty`
        },
        isUrl: {
          msg: 'Please provide a valid URL'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};