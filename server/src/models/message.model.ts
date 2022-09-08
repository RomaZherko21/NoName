import { DataTypes } from 'sequelize'

import sequelize from '.'
import UserModel from './user.model'

const MesageModel = sequelize.define(
  'messages',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'messages', // You can simply tell DataTypes the name of the table directly
  }
)

UserModel.hasMany(MesageModel)

export default MesageModel
