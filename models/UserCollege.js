const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserCollege extends Model {}

UserCollege.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        college_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'college',
                key: 'id',
                unique: false
            }
        }
    },
    {
    sequelize,
    freezeTableName: true,
    modelName: 'UserCollege'
    }
);

module.exports = UserCollege;