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
    job_title: {
      type: DataTypes.STRING,
    },
    profile_background: {
      type: DataTypes.STRING,
    },
    native_country: {
      type: DataTypes.STRING,
    },
    native_city: {
      type: DataTypes.STRING,
    },
    residence_country: {
      type: DataTypes.STRING,
    },
    residence_city: {
      type: DataTypes.STRING,
    },
    card_number: {
      type: DataTypes.STRING,
    },
    name_on_card: {
      type: DataTypes.STRING,
    },
    valid_thru: {
      type: DataTypes.STRING,
    },
    cvv: {
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

UserModel.belongsToMany(PostModel, {
  through: 'm2m_users_posts_likes',
  as: 'users',
  foreignKey: 'user_id',
  onDelete: 'cascade',
})

PostModel.belongsToMany(UserModel, {
  through: 'm2m_users_posts_likes',
  as: 'posts',
  foreignKey: 'post_id',
  onDelete: 'cascade',
})

export default UserModel
