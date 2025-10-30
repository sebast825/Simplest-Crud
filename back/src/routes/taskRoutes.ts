import { Router } from "express";
import TaskController from "../controllers/taskController";
import { taskService } from "../services/taskService";

const router = Router();
const authController = new TaskController(taskService);

router.get("/task/user/:userId",  authController.getTasksByUser);

module.exports = router; 