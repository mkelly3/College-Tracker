const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class College extends Model {}
College.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		// instate: {
		//     type: DataTypes.INTEGER,
		//     allowNull: false,
		// }
		// outofstate: {
		//     type: DataTypes.INTEGER,
		//     allowNull: false,
		// },
		// oncampus: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// },
		// offcampus: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// },
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// location: {
		// 	type: DataTypes.STRING,
		// 	allowNull: false,
		// },
		// associates: {
		// 	type: DataTypes.BOOLEAN,
		// 	allowNull: false,
		// },
		// bachelors: {
		// 	type: DataTypes.BOOLEAN,
		// 	allowNull: false,
		// },
		// admission: {
		// 	type: DataTypes.DECIMAL(4, 2),
		// 	allowNull: false,
		// },
		// Male_Students: {
		// 	type: DataTypes.DECIMAL(4, 2),
		// 	allowNull: false,
		// },
		// Female_Students: {
		// 	type: DataTypes.DECIMAL(4, 2),
		// 	allowNull: false,
		// },
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "college",
	}
);

module.exports = College;
