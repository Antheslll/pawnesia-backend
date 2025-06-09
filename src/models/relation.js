import sequelize from "../config/db.js";
import Comments from "./comment.js";
import Products from "./product.js";
import Users from "./user.js";

Comments.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Comments, { foreignKey: "user_id" });

Comments.belongsTo(Products, {
  foreignKey: "product_id",
  targetKey: "product_id",
});
Products.hasMany(Comments, {
  foreignKey: "product_id",
  sourceKey: "product_id",
});

export { sequelize, Users, Products, Comments };
