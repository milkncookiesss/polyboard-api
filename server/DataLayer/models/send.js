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
          type: Sequelize.FLOAT,
          defaultValue: 0
        },
        grade: {
          type: Sequelize.STRING
        },
        note: {
          type: Sequelize.STRING
        },
        hidden: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
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
