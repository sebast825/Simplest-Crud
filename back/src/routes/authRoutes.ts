import { Router } from "express";
import AuthController from "../controllers/authController";
import { userService } from "../services/userService";
import { jwtService } from "../services/jwtService";
import UserController from "../controllers/userController";

const router = Router();
const authController = new AuthController(userService, jwtService);
const userController = new UserController(userService);

router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.post("/register", userController.create);

export { router as authRoutes };
