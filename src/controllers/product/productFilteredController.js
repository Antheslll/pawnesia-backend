import sendErrorResponse from "../../utils/responseHandler/errorResponseHandler.js";
import Products from "../../models/product.js";
import sendDataResponse from "../../utils/responseHandler/sendDataResponse.js";
import getProductsByCategory from "../../utils/productServiceFunction.js";
import { v4 as uuidv4 } from "uuid";
import sendSuccessResponse from "../../utils/responseHandler/successResponseHandler.js";

const showProducts = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      sendErrorResponse(res, 400, "Cannot get Product Category", {
        inputCategory: category,
      });
      return;
    }

    if (["All", "Food", "Accessories", "Animal"].includes(category)) {
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

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      stock,
      category,
      productImage,
    } = req.body;

    if (
      !category ||
      !productName ||
      !productDescription ||
      !stock ||
      !productPrice ||
      !productImage
    ) {
      return sendErrorResponse(res, 400, "Cannot get Product Category", {
        productName,
        productPrice,
        productDescription,
        stock,
        category,
        productImage,
      });
    }

    const newProductId = uuidv4();
    const newUUID = uuidv4();
    const creatingNewProduct = await Products.create({
      product_id: newProductId,
      uuid: newUUID,
      product_name: productName,
      product_price: productPrice,
      product_description: productDescription,
      stock,
      category,
      product_image: productImage,
    });

    return sendSuccessResponse(res, 200, "Berhasil membuat produk", {
      status_produk: creatingNewProduct,
    });
  } catch (err) {
    console.error("Error: ", err);
    return err;
  }
};

const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      productName,
      productPrice,
      productDescription,
      stock,
      category,
      productImage,
    } = req.body;

    if (
      !category ||
      !productName ||
      !productDescription ||
      !stock ||
      !productPrice ||
      !productImage
    ) {
      return sendErrorResponse(res, 400, "Cannot get Product Category", {
        productName,
        productPrice,
        productDescription,
        stock,
        category,
        productImage,
      });
    }

    if (!id) {
      return sendErrorResponse(res, 400, "Cannot get Product Category", {
        product_id: id,
      });
    }

    const [editingProduct] = await Products.update(
      {
        product_name: productName,
        product_price: productPrice,
        product_description: productDescription,
        stock,
        category,
        product_image: productImage,
      },
      { where: { product_id: id } }
    );

    if (editProduct === 0) {
      return sendErrorResponse(
        res,
        404,
        "Produk tidak ditemukan atau tidak diubah",
        { product_id: id }
      );
    }

    return sendSuccessResponse(res, 200, "Berhasil mengedit produk", {
      status_pengeditan: editingProduct,
    });
  } catch (err) {
    console.error("Error: ", err);
    return err;
  }
};

export { showProducts, showSpecificProduct, createProduct, editProduct };
