import Sequelize from 'sequelize';

export default class Problem extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        userId: {
          type: Sequelize.UUID,
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
