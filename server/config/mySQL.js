const Sequelize = require('sequelize')
const process = require('dotenv').config().parsed

const sequelize = new Sequelize(
  process.DB_NAME,
  process.DB_USER,
  process.DB_PASSWORD,
  {
    dialect: 'mysql',
    host: process.DB_HOST,
    // logging: false,  //all operations in console
    define: {
      timestamps: false,
    },
  }
)

module.exports = sequelize
