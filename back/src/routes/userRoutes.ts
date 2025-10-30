import { Router } from "express";
import UserController from "../controllers/userController";
import { userService } from "../services/userService";

const router = Router();
const userController = new UserController(userService);

router.post("/register", userController.create);


module.exports = router; 