import { DataTypes, Model, Optional } from 'sequelize'

import sequelize from './init'
import PostModel from './post'

enum Gender {
  MAN = 'man',
  WOMAN = 'woman',
}

enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

interface User {
  id: number
  name: string
  surname: string
  middle_name: string | null
  email: string
  tel_number: string | null
  role: Role

  gender: Gender
  date_of_birth: Date
  job_title: string | null
  avatar: string | null
  profile_background: string | null

  native_country: string | null
  native_city: string | null
  residence_country: string | null
  residence_city: string | null

  card_number: string | null
  name_on_card: string | null
  valid_thru: string | null
  cvv: string | null

  is_email_verified: boolean
  is_phone_verified: boolean

  is_two_factor_auth_active: boolean
  is_sms_alerts_active: boolean
  is_email_alerts_active: boolean

  password: string
}

interface ModelCreation extends Optional<User, 'id'> {}

class UserModel extends Model<User, ModelCreation> {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.ENUM(Gender.MAN, Gender.WOMAN),
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
      type: DataTypes.ENUM(Role.ADMIN, Role.USER),
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
    is_email_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_phone_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_two_factor_auth_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_sms_alerts_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_email_alerts_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
)

UserModel.hasMany(PostModel, {
  foreignKey: 'user_id',
})

UserModel.belongsToMany(PostModel, {
  through: 'm2m_users_posts_likes',
  as: 'users',
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

PostModel.belongsToMany(UserModel, {
  through: 'm2m_users_posts_likes',
  as: 'posts',
  foreignKey: 'post_id',
  onDelete: 'CASCADE',
})

export default UserModel
