import { useEffect, useState } from "react";
import type { Task } from "../types/task.types";
import apiClient from "../api/client";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
         const response = await apiClient.get("/task/user/14");
        const data =  response.data;
        setTasks(data.tasks);
        console.log(data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading };

}