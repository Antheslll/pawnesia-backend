import Products from "../models/product.js";

const getProductsByCategory = async (category, limitTop = 5) => {
  const commonAttributes = [
    "uuid",
    "product_image",
    "product_name",
    "product_price",
  ];

  const products = await Products.findAll({
    attributes: commonAttributes,
    where: category === "All" ? {} : { category },
  });

  const topProducts = await Products.findAll({
    attributes: commonAttributes,
    where: category === "All" ? {} : { category },
    order: [["product_price", "DESC"]],
    limit: limitTop,
  });

  return { products, topProducts };
};

export default getProductsByCategory;
