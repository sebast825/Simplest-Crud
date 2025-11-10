import { Task } from "@prisma/client";
import { CustomError } from "../helpers/customError";
import TaskRepository, { taskRepository } from "../repositories/taskRepository";

class TaskService {
  constructor(private taskRepository: TaskRepository) {}
  public async getTasksByUser(userId: string): Promise<Task[]> {
    if (!userId) {
      throw new CustomError("Uuser Id is required", 400);
    }

    const tasks : Task[] = await this.taskRepository.getAllByUserId(parseInt(userId));
    return tasks;
  }
  public async updateTaskStatus(taskId: number, userId: number) {
    if (!taskId) {
      throw new CustomError("Task Id is required", 400);
    }
    await this.taskBelongsUser(taskId, userId);
    return await this.taskRepository.updateTaskStatus(taskId);
  }
  public async deleteTask(taskId: number) {
    if (!taskId) {
      throw new CustomError("Task Id is required", 400);
    }

    return await this.taskRepository.delete(taskId);
  }

  public async createTask(title: string, userId: number) : Promise<Task> {
    if (!userId || !title) {
      throw new CustomError("User Id and title are required", 400);
    }

    return await this.taskRepository.create(title, userId);
  }

  private async taskBelongsUser(taskId: number, userId: number) {
    var taskToUpdate : Task | null = await this.taskRepository.getById(taskId);
    if (!taskToUpdate) {
      throw new CustomError("Task not found", 404);
    }
    if (taskToUpdate.userId != userId) {
      throw new CustomError("Unauthorize to edit this task", 401);
    }
  }
}

export const taskService = new TaskService(taskRepository);

export default TaskService;
