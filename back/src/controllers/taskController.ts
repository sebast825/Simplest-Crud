import { Request, Response } from "express";
import TaskService from "../services/taskService";
const { connectDB, sql } = require("../config/database.ts");


class TaskController {

   constructor(private taskService: TaskService){}
   
   getTasksByUser = async(req: Request, res: Response): Promise<void> =>{
 
        try {
      const { userId } = req.params;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }
      var rsta = await this.taskService.getTasksByUser(userId);

      res.status(200).json({ tasks: rsta});
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: (error as Error).message });
    }
   }
         
}

export default  TaskController;