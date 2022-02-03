const Sequelize = require('sequelize')

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  // logging: false, //all operations in console
  define: {
    timestamps: false,
  },
})

module.exports = sequelize
