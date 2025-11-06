import { Router } from "express";
import TaskController from "../controllers/taskController";
import { taskService } from "../services/taskService";
import { authMiddleware } from "../middlewares/authMiddleware ";

const router = Router();
const taskController = new TaskController(taskService);

router.get("/task/user",authMiddleware, taskController.getTasksByUser);
router.patch("/task/:taskId",  authMiddleware,taskController.updateTaskStatus);
router.delete("/task/:taskId", authMiddleware, taskController.deleteTask);
router.post("/task", authMiddleware, taskController.createTask);

export  {router as taskRoutes}; 