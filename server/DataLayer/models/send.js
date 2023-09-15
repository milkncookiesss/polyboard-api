import Sequelize from 'sequelize';

export default class Send extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        problemId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        rating: {
          type: Sequelize.INTEGER
        },
        grade: {
          type: Sequelize.STRING
        },
        note: {
          type: Sequelize.STRING
        }
      },
      {
        sequelize,
        timestamps: true,
        schema: 'problems',
        tableName: 'sends',
        underscored: true
      }
    )
  }
}
