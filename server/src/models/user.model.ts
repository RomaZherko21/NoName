import { DataTypes } from 'sequelize'

import sequelize from '.'
import ItemModel from './item.model'

const UserModel = sequelize.define(
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
    },
    surname: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users', // You can simply tell DataTypes the name of the table directly
  }
)

UserModel.hasMany(ItemModel)

export default UserModel
