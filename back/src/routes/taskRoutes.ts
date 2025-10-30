import { Router } from "express";
import TaskController from "../controllers/taskController";

const router = Router();
const authController = new TaskController();

router.get("/task/user/:userId",  authController.getTasksByUser);

module.exports = router; 