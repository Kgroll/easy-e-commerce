const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Product, Category, Tag, ProductTag} = require('../../models');

class ProductTag extends Model {}

ProductTag.init(
  {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        product_id: {
          type: DataTypes.INTEGER,
          //REFERENCES THE product model's id
          references: {
            model: Product,
            key: 'id'
          }
        }
        },
        tag_id: {
          type: DataTypes.INTEGER,
          //references the TAG MODELS ID
          references: {
            model: Tag,
            key: 'id'
        }
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