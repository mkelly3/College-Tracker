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
		// price: {
		// 	type: DataTypes.INTEGER,
		// 	allowNull: false,
		// },
		// Instate_Tuition: {
		// 	type: DataTypes.INTEGER,
		// },
		// Out_Of_State_Tuition: {
		// 	type: DataTypes.INTEGER,
		// },
		// On_Campus: {
		// 	type: DataTypes.INTEGER,
		// },
		// Off_Campus: {
		// 	type: DataTypes.INTEGER,
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
		Admission_Rate: {
			type: DataTypes.DECIMAL(4, 2),
		},
		Male_Students: {
			type: DataTypes.DECIMAL(4, 2),
		},
		Female_Students: {
			type: DataTypes.DECIMAL(4, 2),
		},
		School_Type: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "college",
	}
);

module.exports = College;
