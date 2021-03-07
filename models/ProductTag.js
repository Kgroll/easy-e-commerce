const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class ProductTag extends Model {}

ProductTag.init(
  {
    id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
    product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "product",
      key: 'id'
   }                 //REFERENCES THE product model's id                    
  },
    tag_id: {
    type: DataTypes.INTEGER,
    references: {
    model: "tag",
    key: 'id'
  }             //references the TAG MODELS ID                 
}   
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
