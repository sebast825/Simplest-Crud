import { Router } from "express";
import AuthController from "../controllers/authController";
import {userService} from "../services/userService";



const router = Router();
const authController = new AuthController(userService);

router.post("/login",  authController.login);

module.exports = router; 