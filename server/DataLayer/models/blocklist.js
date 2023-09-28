import Sequelize from 'sequelize';

export default class BlockList extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        userId: {
          type: DataTypes.UUID,
          primaryKey: true,
          allowNull: false
        },
        blockedUserId: {
          type: DataTypes.UUID,
          allowNull: false
        }
      },
      {
        sequelize,
        timestamps: true,
        schema: 'reports',
        tableName: 'blocklist',
        underscored: true
      }
    )
  }
}
