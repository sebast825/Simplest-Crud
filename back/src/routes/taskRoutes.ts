import { Router } from "express";
import TaskController from "../controllers/taskController";
import { taskService } from "../services/taskService";

const router = Router();
const taskController = new TaskController(taskService);

router.get("/task/user/:userId",  taskController.getTasksByUser);
router.patch("/task/:taskId",  taskController.updateTaskStatus);

module.exports = router; 