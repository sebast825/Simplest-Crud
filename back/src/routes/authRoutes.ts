import { Router } from "express";
import AuthController from "../controllers/authController";
import {userService} from "../services/userService";
import { jwtService } from "../services/jwtService";



const router = Router();
const authController = new AuthController(userService,jwtService);

router.post("/login",  authController.login);

export { router as authRoutes }; 