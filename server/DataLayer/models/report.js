import Sequelize from 'sequelize';

export default class Report extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
        reporter: {
          type: DataTypes.UUID,
          allowNull: false
        },
        reportType: {
          type: DataTypes.STRING
        },
        reportedId: {
          type: DataTypes.UUID,
          allowNull: false
        },
        comment: {
          type: DataTypes.STRING
        }
      },
      {
        sequelize,
        timestamps: true,
        schema: 'reports',
        tableName: 'reports',
        underscored: true
      }
    )
  }
}
