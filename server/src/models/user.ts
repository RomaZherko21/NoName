import { DataTypes } from 'sequelize'

import sequelize from './init'
import PostModel from './post'

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
    middle_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM('man', 'woman'),
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tel_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users', // You can simply tell DataTypes the name of the table directly
  }
)

UserModel.hasMany(PostModel, {
  foreignKey: 'user_id',
})

export default UserModel
