import { Request, Response } from "express";
import TaskService from "../services/taskService";

class TaskController {
  constructor(private taskService: TaskService) {}
  asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
    return async (req: Request, res: Response) => {
      try {
        await fn(req, res);
      } catch (error: any) {
        console.log("Error: ", error);
        const statusCode = error.statusCode || 500;
        if (statusCode >= 500) {
          res.status(500).json({ error: "Internal server Error" });
        } else {
          res.status(statusCode).json({ error: error.message });
        }
      }
    };
  };
  getTasksByUser = this.asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const userId = (req as any).userId; // comes from the token

      if (!userId) {
        res.status(400).json({ error: "user Id is required" });
        return;
      }
      var rsta = await this.taskService.getTasksByUser(userId);

      res.status(200).json({ tasks: rsta });
    }
  );

  updateTaskStatus = this.asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const taskId = parseInt(req.params.taskId, 10);
      if (!taskId) {
        res.status(400).json({ error: "task Id is required" });
        return;
      }
      var rsta = await this.taskService.updateTaskStatus(taskId);

      res.status(200).json({ tasks: rsta });
    }
  );
  deleteTask = this.asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const taskId = parseInt(req.params.taskId, 10);
      if (!taskId) {
        res.status(400).json({ error: "task Id is required" });
        return;
      }
      var rsta = await this.taskService.deleteTask(taskId);

      res.status(200).json({ taskId: taskId });
    }
  );
  createTask = this.asyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { title } = req.body;
      const userId = (req as any).userId; // comes from the token

      if (!userId || !title) {
        res.status(400).json({ error: "User Id and title is required" });
        return;
      }
      var rsta = await this.taskService.createTask(title, userId);

      res.status(200).json({ tasks: rsta });
    }
  );
}

export default TaskController;
