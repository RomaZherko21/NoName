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
    status: {
      type: DataTypes.ENUM('pending', 'decline', 'accept'),
      allowNull: false,
    },
  },
  {
    tableName: 'user_connections',
  }
)

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'sender_id',
})

UserConnectionModel.belongsTo(UserModel, {
  foreignKey: 'recipient_id',
})

export default UserConnectionModel
