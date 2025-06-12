import sequelize from "../config/db.js";
import CartItems from "./cartItems.js";
import Comments from "./comment.js";
import Products from "./product.js";
import Users from "./user.js";

//Comments---Users
Comments.belongsTo(Users, { foreignKey: "user_id", targetKey: "user_id" });
Users.hasMany(Comments, { foreignKey: "user_id", targetKey: "user_id" });

//Commments---Products
Comments.belongsTo(Products, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
Products.hasMany(Comments, {
  foreignKey: "product_id",
  sourceKey: "product_id",
});

//CartItems---Users
CartItems.belongsTo(Users, { foreignKey: "user_id", targetKey: "user_id" });
Users.hasMany(CartItems, { foreignKey: "user_id", targetKey: "user_id" });

CartItems.belongsTo(Products, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
Products.hasMany(CartItems, {
  foreignKey: "product_id",
  targetKey: "product_id",
});

export { sequelize, Users, Products, Comments, CartItems };
