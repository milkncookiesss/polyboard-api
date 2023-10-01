import Sequelize from 'sequelize';

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          unique: true,
          allowNull: false,
          primaryKey: true
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        displayname: {
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
        userToken: {
          type: Sequelize.STRING
        },
        hidden: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        role: {
          type: Sequelize.STRING,
          defaultValue: 'user'
        }
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
