import { Router } from "express";
import UserController from "../controllers/userController";
import { userService } from "../services/userService";

const router = Router();
const userController = new UserController(userService);

router.post("/users", userController.create);


module.exports = router; 