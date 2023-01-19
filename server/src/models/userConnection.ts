import { DataTypes } from 'sequelize'

import sequelize from './init'
import UserModel from './user'

const UserConnectionModel = sequelize.define(
  'user_connections',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: 'user_connections',
  }
)

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'first_user_id',
})

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'second_user_id',
})

export default UserConnectionModel
