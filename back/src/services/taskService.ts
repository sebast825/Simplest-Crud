const { connectDB, sql } = require("../config/database.ts");

import { Request, Response } from "express";

class TaskService{
public async getTasksByUser(userId : string): Promise<void> {
    try {
      
    const pool = await connectDB();
 
      const result = await pool
        .request()
        .input('userId', sql.Int, parseInt(userId))
        .query('SELECT * FROM tasks WHERE userId = @userId');

      return result.recordset;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
}}

export const taskService = new TaskService();

export default TaskService;