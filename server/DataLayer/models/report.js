import Sequelize from 'sequelize';

export default class Report extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true
        },
        reportType: {
          type: DataTypes.STRING
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
