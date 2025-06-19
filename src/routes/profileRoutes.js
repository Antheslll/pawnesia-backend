import profileController, {
  editProfile,
  showOrder,
} from "../controllers/profile/profileController.js";
import editProfileMiddleware from "../middlewares/profile/editProfileMiddleware.js";
import getOrderMiddleware from "../middlewares/profile/getOrderMiddleware.js";
import verifyJwt from "../middlewares/profile/getProfileMiddleware.js";
import router from "./authRoutes.js";

router.post("/user/access", verifyJwt, profileController);
router.put("/user/edit", editProfileMiddleware, editProfile);
router.get("/user/order", getOrderMiddleware, showOrder);

export default router;
