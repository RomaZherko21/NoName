import { DataTypes } from 'sequelize'

import sequelize from '.'

const ItemModel = sequelize.define(
  'items',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'items', // You can simply tell DataTypes the name of the table directly
  }
)

export default ItemModel
