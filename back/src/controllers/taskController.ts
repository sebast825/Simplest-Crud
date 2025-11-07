import { Request, Response } from "express";
import TaskService from "../services/taskService";
import { asyncHandler } from "../helpers/asyncHandler";

class TaskController {
  constructor(private taskService: TaskService) {}

  getTasksByUser = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = (req as any).userId; // comes from the token
      var tasks = await this.taskService.getTasksByUser(userId);

      res.status(200).json(tasks);
    }
  );

  updateTaskStatus = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const taskId = parseInt(req.params.taskId, 10);
      var updatedTask = await this.taskService.updateTaskStatus(taskId);

      res.status(200).json(updatedTask);
    }
  );
  deleteTask = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const taskId = parseInt(req.params.taskId, 10);
      await this.taskService.deleteTask(taskId);

      res.status(204).json();
    }
  );
  createTask = asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { title } = req.body;
      const userId = (req as any).userId; // comes from the token
      var createdTask = await this.taskService.createTask(title, userId);

      res.status(201).json(createdTask);
    }
  );
}

export default TaskController;
