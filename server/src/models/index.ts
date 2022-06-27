import { Sequelize } from 'sequelize'

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env

const sequelize = new Sequelize(String(DB_NAME), DB_USER || '', DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  logging: false, // all operations in console
  define: {
    timestamps: false,
  },
})

export default sequelize
