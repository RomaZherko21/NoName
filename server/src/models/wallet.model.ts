import { DataTypes } from 'sequelize'

import sequelize from '.'
import UserModel from './user.model'

const WalletModel = sequelize.define(
  'wallets',
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
  },
  {
    tableName: 'wallets', // You can simply tell DataTypes the name of the table directly
  }
)

UserModel.hasMany(WalletModel)

export default WalletModel
