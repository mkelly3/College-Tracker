// module.exports = Post;
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
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
      Instate_Tuition: {
        type: DataTypes.INTEGER,
      },
      Out_Of_State_Tuition: {
        type: DataTypes.INTEGER,
      },
      On_Campus: {
        type: DataTypes.INTEGER,
      },
      Off_Campus: {
        type: DataTypes.INTEGER,
      },
      size: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      associates: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      bachelors: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
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
      },
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'post'
    }
  );
  
  module.exports = Post;