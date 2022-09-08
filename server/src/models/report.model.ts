import { DataTypes } from 'sequelize'

import sequelize from '.'
import UserModel from './user.model'

const ReportModel = sequelize.define(
  'reports',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'reports', // You can simply tell DataTypes the name of the table directly
  }
)

UserModel.hasMany(ReportModel)

export default ReportModel
