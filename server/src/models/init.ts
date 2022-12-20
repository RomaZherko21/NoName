import { Sequelize } from 'sequelize'

const { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD } = process.env

const sequelize = new Sequelize(String(MYSQL_DATABASE), MYSQL_USERNAME || '', MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: 'mysql_db',
  logging: false, // all operations in console
  define: {
    timestamps: false,
  },
})

export default sequelize
