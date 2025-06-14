import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Products = sequelize.define(
  "Product",
  {
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("FOOD", "ACCESSORIES", "ANIMAL"),
      allowNull: false,
    },
    product_image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

export default Products;
