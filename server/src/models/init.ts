import { Sequelize } from 'sequelize'

const { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST } = process.env

const sequelize = new Sequelize(String(MYSQL_DATABASE), MYSQL_USERNAME || '', MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: MYSQL_HOST,
  dialectModule: require('mysql2'),
  logging: false, // all operations in console
  define: {
    timestamps: false,
  },
})

export default sequelize
