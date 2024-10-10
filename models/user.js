'use strict';

const bcrypt = require('bcryptjs/dist/bcrypt');
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Product, {
        through: models.Order,
        foreignKey: 'userId',
        otherKey: 'productId'
      })
    }
  }
  User.init(
		{
			username: DataTypes.STRING,
			email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        }
      },
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		}, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate(instance, options){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    }
  });
  return User;
};
