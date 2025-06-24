import Orders from "../../models/orders.js";
import sendDataResponse from "../../utils/responseHandler/sendDataResponse.js";

const viewOrder = async (req, res) => {
  try {
    const allOrder = await Orders.findAll();

    console.log(allOrder);
    return sendDataResponse(res, 200, "Get Order Successfully", {
      orderData: allOrder,
    });
  } catch (err) {
    console.error("Error: ", err);
    return err;
  }
};

export default viewOrder;
