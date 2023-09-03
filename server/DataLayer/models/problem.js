import Sequelize from 'sequelize';

export default class Problem extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdBy: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        routePath: {
          type: Sequelize.ARRAY(DataTypes.STRING),
          allowNull: false
        },
        weight: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: true,
        schema: 'problems',
        tableName: 'problems',
        underscored: true
      }
    )
  }
}
