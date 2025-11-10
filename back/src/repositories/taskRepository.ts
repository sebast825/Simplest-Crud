import { Task } from "@prisma/client";
import { prisma } from "../config/database";

class TaskRepository {
  getAllByUserId = async (userId: number): Promise<Task[]> => {
    const result: Task[] = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return result;
  };
  getById = async (taskId: number): Promise<Task | null> => {
    const task: Task | null = await prisma.task.findUnique({
      where: { id: taskId },
    });
    return task;
  };

  updateTaskStatus = async (taskId: number, status: boolean): Promise<Task> => {
    const result: Task = await prisma.task.update({
      where: { id: taskId },
      data: {
        done: status,
      },
    });

    return result;
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
  delete = async (taskId: number): Promise<Task> => {
    return await prisma.task.delete({ where: { id: taskId } });
  };
}

export default TaskRepository;
export const taskRepository = new TaskRepository();
