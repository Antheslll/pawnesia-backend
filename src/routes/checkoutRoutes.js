import express from "express";
import createDraft from "../middlewares/checkout/draftMiddleware.js";
import {
  checkoutFinalization,
  CreateNewDraft,
  draftToRealOrder,
  proofingTransfer,
} from "../controllers/checkout/checkoutController.js";
import finalizeCheckout from "../middlewares/checkout/coFinalizationMiddleware.js";
import proofReq from "../middlewares/checkout/proofMiddleware.js";

const router = express.Router();

router.post("/draft", createDraft, CreateNewDraft);
router.post("/finalize", finalizeCheckout, checkoutFinalization);
router.post("/proof", proofReq, proofingTransfer, draftToRealOrder);
export default router;

// {
//     "status": "Success",
//     "message": "Berhasil membuat Order draft baru",
//     "detail": {
//         "field": "orderDraft, orderDetailDraft, shippingAddressDraft",
//         "data": {
//             "OrdersDraftData": [
//                 {
//                     "order_id": "49843869-8ab0-46ee-89fa-5bfef97c58e2",
//                     "user_id": "11e5aa1e-4366-11f0-b099-9cfce8afa5b8",
//                     "order_time": null,
//                     "estimate_arrival": null,
//                     "status": null,
//                     "proof_of_transfer": null,
//                     "total_price": 125000
//                 },
//                 {
//                     "order_id": "4fb13da2-8400-4565-8a98-36624802d242",
//                     "user_id": "11e5aa1e-4366-11f0-b099-9cfce8afa5b8",
//                     "order_time": null,
//                     "estimate_arrival": null,
//                     "status": null,
//                     "proof_of_transfer": null,
//                     "total_price": 125000
//                 }
//             ],
//             "OrderDetailDraftData": [
//                 {
//                     "order_detail_id": "cd580d95-4b60-42ce-a17c-3671780cc04a",
//                     "order_id": "4fb13da2-8400-4565-8a98-36624802d242",
//                     "product_id": "11da9a68-4366-11f0-b099-9cfce8afa5b8",
//                     "quantity": 5,
//                     "amount": 25000,
//                     "subtotal": 125000
//                 }
//             ],
//             "ShippingAddressDraftData": [
//                 {
//                     "shipping_address_id": "a614a997-474a-4189-8147-0999035b57b7",
//                     "order_id": "4fb13da2-8400-4565-8a98-36624802d242",
//                     "receiver_name": null,
//                     "phone_number": null,
//                     "address": null
//                 }
//             ]
//         }
//     }
// }
