import { DataTypes, Model, Optional } from 'sequelize'

import sequelize from './init'
import UserModel from './user'

export enum ConnectionStatus {
  pending = 'pending',
  decline = 'decline',
  accept = 'accept',
}

interface UserConnection {
  id: number
  status: ConnectionStatus

  sender_id: number
  recipient_id: number
}

interface ModelCreation extends Optional<UserConnection, 'id'> {}

class UserConnectionModel extends Model<UserConnection, ModelCreation> {}

UserConnectionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ConnectionStatus)),
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: 'id',
      },
    },
  },
  {
    sequelize,
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
