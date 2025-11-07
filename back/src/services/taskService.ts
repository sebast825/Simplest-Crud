const { connectDB, sql } = require("../config/database.ts");

import { Request, Response } from "express";
import { CustomError } from "../helpers/customError";
import TaskRepository, { taskRepository } from "../repositories/taskRepository";

class TaskService {
  constructor(private taskRepository: TaskRepository) {}
  public async getTasksByUser(userId: string): Promise<void> {
    if (!userId) {
      throw new CustomError("Uuser Id is required", 400);
    }
    const tasks = await this.taskRepository.getAllByUserId(userId);
    return tasks;
  }
  public async updateTaskStatus(taskId: number) {
    if (!taskId) {
      throw new CustomError("Task Id is required", 400);
    }

    return await this.taskRepository.updateTaskStatus(taskId);
  }
  public async deleteTask(taskId: number) {
    if (!taskId) {
      throw new CustomError("Task Id is required", 400);
    }

    return await this.taskRepository.delete(taskId);
  }

  public async createTask(title: string, userId: number) {
    if (!userId || !title) {
      throw new CustomError("User Id and title are required", 400);
    }

    return await this.taskRepository.create(title, userId);
  }
}

export const taskService = new TaskService(taskRepository);

export default TaskService;
