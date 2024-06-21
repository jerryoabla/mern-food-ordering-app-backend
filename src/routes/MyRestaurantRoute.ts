import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

const storage = multer.memoryStorage();
const  upload = multer({
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 *1024, //5mb
  },
});

// 7:48:20 GET /api/my/restaurant
router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// 5:45:42 All post requests that gets to /api/my/restaurant is going to handled on this file
router.post(
  "/", 
  upload.single("imageFile"), 
  validateMyRestaurantRequest, 
  jwtCheck, 
  jwtParse, 
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.single("imageFile"), 
  validateMyRestaurantRequest, 
  jwtCheck, 
  jwtParse, 
  MyRestaurantController.updateMyRestaurant
)

export default router; 
