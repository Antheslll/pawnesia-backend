import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import Products from "../../models/product.js";
import sendDataResponse from "../../utils/responseHandler/sendDataResponse.js";
import getProductsByCategory from "../../utils/productServiceFunction.js";

const showProducts = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      sendErrorResponse(res, 400, "Cannot get Category", {
        inputCategory: category,
      });
      return;
    }

    if (["All", "Food", "Accessories", "Animals"].includes(category)) {
      const showProducts = await getProductsByCategory(category, 5);
      sendDataResponse(
        res,
        200,
        `Show Product by Category ${category} Success`,
        showProducts
      );
    } else {
      sendErrorResponse(res, 400, `There is no such Category as ${category}`, {
        field: "Products",
        message: "requestnya salah, ga ada kategori itu",
      });
    }
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", {
      message: err.message,
    });
  }
};

const showSpecificProduct = async (req, res) => {
  try {
    const { uuid } = req.params;
    if (!uuid) {
      sendErrorResponse(res, 400, "No UUID", { the_params: req.params });
      return;
    }

    const product = await Products.findOne({
      where: { uuid: uuid },
    });

    sendDataResponse(
      res,
      200,
      `Get Product for ${product.product_name} where the UUID: ${uuid}`,
      product
    );
  } catch (err) {
    return sendErrorResponse(res, 500, "Server error", {
      message: err.message,
    });
  }
};

export { showProducts, showSpecificProduct };
