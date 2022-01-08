const { DataTypes } = require('sequelize')
const sequelize = require('../config/mySQL')

const Users = sequelize.define(
  'users',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    freezeTableName: false, //table name = "Customer" will be "Customer" in a database (not "Customers")
    tableName: 'users', // You can simply tell DataTypes the name of the table directly
  }
)

module.exports = Users
