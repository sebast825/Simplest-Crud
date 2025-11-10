import { Task } from "@prisma/client";
import { connectDB, prisma, sql } from "../config/database";

class TaskRepository {
  getAllByUserId = async (userId: number): Promise<any> => {


    const result =  await prisma.task.findMany({
      where : {
        userId : userId
      }
    })
    return result;
  };
  getById = async (taskId: number): Promise<any> => {
    const pool = await connectDB();

    const result = await pool
      .request()
      .input("Id", sql.Int, taskId)
      .query("SELECT * FROM tasks WHERE Id = @Id");

    return result.recordset[0];
  };

  updateTaskStatus = async (taskId: number) => {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("taskId", sql.Int, taskId)
      .query(
        "UPDATE tasks SET done = CASE WHEN done = 1 THEN 0 ELSE 1 END OUTPUT inserted.* WHERE id = @taskId"
      );

    return result.recordset[0];
  };
  create = async (title: string, userId: number): Promise<Task> => {
    const task: Task = await prisma.task.create({
      data: {
        title: title,
        userId: userId,
      },
    });

    return task;
  };
  delete = async (taskId: number) => {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("taskId", sql.Int, taskId)
      .query("DELETE FROM tasks OUTPUT deleted.* WHERE id = @taskId");

    return result.recordset[0];
  };
}

export default TaskRepository;
export const taskRepository = new TaskRepository();
