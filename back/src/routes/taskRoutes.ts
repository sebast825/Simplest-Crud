import { Router } from "express";
import TaskController from "../controllers/taskController";
import { taskService } from "../services/taskService";
import { authMiddleware } from "../middlewares/authMiddleware ";

const router = Router();
const taskController = new TaskController(taskService);

router.get("/user",authMiddleware, taskController.getTasksByUser);
router.patch("/:taskId",  authMiddleware,taskController.updateTaskStatus);
router.delete("/:taskId", authMiddleware, taskController.deleteTask);
router.post("", authMiddleware, taskController.createTask);

export  {router as taskRoutes}; 