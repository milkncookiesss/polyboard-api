import Sequelize from 'sequelize';

export default class BlockList extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        userId: {
          type: DataTypes.UUID,
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
        schema: 'users',
        tableName: 'blocklist',
        underscored: true
      }
    )
  }
}
