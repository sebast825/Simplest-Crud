const { connectDB, sql } = require("../config/database.ts");

import { Request, Response } from "express";
import { CustomError } from "../helpers/customError";

class TaskService {
  public async getTasksByUser(userId: string): Promise<void> {
    try {
      if (!userId) {
        throw new CustomError("Uuser Id is required", 400);
      }
      const pool = await connectDB();

      const result = await pool
        .request()
        .input("userId", sql.Int, parseInt(userId))
        .query("SELECT * FROM tasks WHERE userId = @userId");

      return result.recordset;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  }
  public async updateTaskStatus(taskId: number) {
    try {
      if (!taskId) {
        throw new CustomError("Task Id is required", 400);
      }
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("taskId", sql.Int, taskId)
        .query(
          "UPDATE tasks SET done = CASE WHEN done = 1 THEN 0 ELSE 1 END OUTPUT inserted.* WHERE id = @taskId"
        );

      return result.recordset[0];
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
  public async deleteTask(taskId: number) {
    try {
      if (!taskId) {
        throw new CustomError("Task Id is required", 400);
      }
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("taskId", sql.Int, taskId)
        .query("DELETE FROM tasks OUTPUT deleted.* WHERE id = @taskId");

      return result.recordset[0];
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  public async createTask(title: string, userId: number) {
    try {
      if (!userId || !title) {
        throw new CustomError("User Id and title are required", 400);
      }
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("title", sql.NVarChar, title)
        .input("userId", sql.Int, userId)
        .query(
          "INSERT INTO tasks (title, done, userId) OUTPUT inserted.* VALUES (@title, 0, @userId)"
        );

      return result.recordset[0]; // devuelve la tarea recién creada
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  }
}

export const taskService = new TaskService();

export default TaskService;
