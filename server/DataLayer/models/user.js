import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          allowNull: false,
          autoIncrement: true
        },
        user_name: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        display_name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          isEmail: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        user_token: {
          type: Sequelize.STRING
        },
      },
      {
        sequelize,
        timestamps: true,
        schema: 'users',
        tableName: 'users',
        underscored: true
      }
    )
  }
}