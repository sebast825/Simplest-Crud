import { useEffect, useState } from "react";
import type { Task } from "../types/task.types";
import apiClient from "../api/client";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await apiClient.get("/tasks/user");
      const data = response.data;
      setTasks(data.tasks);
      console.log(data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateTaskStatus = async (taskId: number) => {
    try {
      console.log("aca", taskId);

      const response = await apiClient.patch("/tasks/" + taskId);
      const updatedTask = response.data.tasks;

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? updatedTask : t))
      );
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteTask = async (taskId: number) => {
    try {
      console.log("aca", taskId);

       await apiClient.delete("/tasks/" + taskId);

      setTasks(prevTasks => prevTasks.filter(t => t.id !== taskId));

    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const createTask = async (title: string) => {
    try {

      var rsta =  await apiClient.post("/tasks/",{title});

    setTasks(prevTasks => [ rsta.data,...prevTasks]);

    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return { tasks, loading, updateTaskStatus,deleteTask,createTask };
};
