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
        createdBy: {
          type: Sequelize.UUID,
          allowNull: false
        },
        route: {
          type: Sequelize.ARRAY(DataTypes.STRING),
          allowNull: false
        },
        weight: {
          type: Sequelize.STRING,
          allowNull: false
        },
        creatorNote: {
          type: Sequelize.STRING,
          allowNull: true
        },
        averageRating: {
          type: Sequelize.INTEGER,
          defaultValue: 0
        },
        grade: {
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
        tableName: 'problems',
        underscored: true
      }
    )
  }
}
