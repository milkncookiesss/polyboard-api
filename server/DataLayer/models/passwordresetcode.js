import Sequelize from 'sequelize';

export default class Passwordresetcode extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        email: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false
        },
        code: {
          type: DataTypes.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: true,
        schema: 'users',
        tableName: 'passwordresetcode',
        underscored: true
      }
    )
  }
}
