import { Request, Response } from "express";
import TaskService from "../services/taskService";
import { TaskcreateRequestDto } from "../dto/task/taskCreateRequestDto.types";


class TaskController {
  constructor(private taskService: TaskService) {}

  getTasksByUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).userId; // comes from the token

      if (!userId) {
        res.status(400).json({ error: "user Id is required" });
        return;
      }
      var rsta = await this.taskService.getTasksByUser(userId);

      res.status(200).json({ tasks: rsta });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  };
  updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = parseInt(req.params.taskId, 10);
      if (!taskId) {
        res.status(400).json({ error: "task Id is required" });
        return;
      }
      var rsta = await this.taskService.updateTaskStatus(taskId);

      res.status(200).json({ tasks: rsta });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  };
   deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = parseInt(req.params.taskId, 10);
      if (!taskId) {
        res.status(400).json({ error: "task Id is required" });
        return;
      }
      var rsta = await this.taskService.deleteTask(taskId);

      res.status(200).json({ taskId: taskId });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  };
  createTask = async (req: Request, res: Response): Promise<void> => {
    try {
          const  { title }  = req.body;
          const userId = (req as any).userId; // comes from the token

      if (!userId || !title) {
        res.status(400).json({ error: "User Id and title is required" });
        return;
      }
      var rsta = await this.taskService.createTask(title,userId);

      res.status(200).json({ tasks: rsta });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: (error as Error).message });
    }
  };
  
}

export default TaskController;
